const axios = require('axios');

const { supabase } = require('../database/db');
const { getSession, setSession, updateSession, deleteSession } = require('../services/redisService');
const { transcribeAudio } = require('../services/sttService');
const { generateResponse, buildSystemPrompt } = require('../services/llmService');
const { synthesizeSpeech } = require('../services/ttsService');
const { sendLeadAlert } = require('../services/whatsappService');
const { calculateCallCost } = require('../services/billingService');

function escapeXml(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function exoResponse(body) {
    return `<?xml version="1.0" encoding="UTF-8"?><Response>${body}</Response>`;
}

function normalizePhoneNumber(value) {
    return String(value || '').replace(/[^\d+]/g, '');
}

async function findPhoneNumberRecord(toNumber) {
    const { data, error } = await supabase
        .from('phone_numbers')
        .select('id, business_id, phone_number')
        .eq('phone_number', normalizePhoneNumber(toNumber))
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;
}

async function fetchAssistant(businessId) {
    const { data, error } = await supabase
        .from('assistants')
        .select('*')
        .eq('business_id', businessId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;
}

async function insertLeadIfCaptured(session, leadData, fallbackPhone) {
    if (!leadData || session.lead_captured) {
        return session.lead_data || null;
    }

    const payload = {
        business_id: session.business_id,
        call_id: session.call_id,
        name: leadData.name || null,
        phone: leadData.phone || fallbackPhone || null,
        intent: leadData.intent || null,
        budget: leadData.budget || null,
        location: leadData.location || null,
        status: 'new',
    };

    const { error } = await supabase.from('leads').insert(payload);
    if (error) {
        throw error;
    }

    return payload;
}

async function fetchBusinessForCall(businessId) {
    const { data, error } = await supabase
        .from('businesses')
        .select('id, name, phone, plan, minutes_used, minutes_limit')
        .eq('id', businessId)
        .single();

    if (error) {
        throw error;
    }

    return data;
}

function buildRecordXml(actionUrl) {
    return `<Record action="${escapeXml(actionUrl)}" maxLength="10" playBeep="false" fileFormat="wav"/>`;
}

function buildWebhookUrl(req, path) {
    const configuredBaseUrl = String(process.env.WEBHOOK_BASE_URL || '').trim().replace(/\/$/, '');
    if (configuredBaseUrl) {
        return `${configuredBaseUrl}${path}`;
    }

    return `${req.protocol}://${req.get('host')}${path}`;
}

async function handleIncomingExotel(req, res) {
    try {
        const { CallSid, From, To } = req.body;
        console.log(`[EXOTEL] Incoming from ${From} to ${To}`);

        const phoneNum = await findPhoneNumberRecord(To);
        if (!phoneNum) {
            return res.type('text/xml').send(exoResponse('<Say>Sorry, this number is not active.</Say>'));
        }

        const assistant = await fetchAssistant(phoneNum.business_id);
        const firstMessage = assistant?.first_message || 'Namaste! Main aapki kaise madad kar sakta hoon?';
        const language = assistant?.language || 'hi-IN';
        const business = await fetchBusinessForCall(phoneNum.business_id);

        const { data: call, error: callError } = await supabase
            .from('calls')
            .insert({
                business_id: phoneNum.business_id,
                phone_number_id: phoneNum.id,
                caller_number: normalizePhoneNumber(From),
                call_sid: CallSid,
                status: 'started',
                provider: 'exotel',
            })
            .select()
            .single();

        if (callError) {
            throw callError;
        }

        await setSession(`call:${CallSid}`, {
            business_id: phoneNum.business_id,
            business_phone: business.phone || '',
            caller_number: normalizePhoneNumber(From),
            call_id: call.id,
            assistant_id: assistant?.id || null,
            language,
            transcript: [],
            turn: 0,
            lead_captured: false,
            lead_data: null,
            lead_alert_sent: false,
            tts_chars_total: 0,
            started_at: Date.now(),
        });

        try {
            await synthesizeSpeech(firstMessage, language);
        } catch (error) {
            console.error('[CALLS] greeting synthesis failed:', error.message);
        }

        const greetingXml = `<Say voice="woman" language="${escapeXml(language)}">${escapeXml(firstMessage)}</Say>`;
        const actionUrl = buildWebhookUrl(req, '/calls/recording');

        return res.type('text/xml').send(exoResponse(`${greetingXml}${buildRecordXml(actionUrl)}`));
    } catch (error) {
        console.error('[CALLS] incoming failed:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

async function handleRecording(req, res) {
    const { CallSid, RecordingUrl, RecordingDuration, From } = req.body;
    console.log(`[EXOTEL] Recording for ${CallSid}, ${RecordingDuration || 0}s`);

    try {
        const sessionKey = `call:${CallSid}`;
        const session = await getSession(sessionKey);
        if (!session) {
            return res.sendStatus(200);
        }

        const audioResponse = await axios.get(RecordingUrl, {
            responseType: 'arraybuffer',
            timeout: 10000,
        });
        const audioBuffer = Buffer.from(audioResponse.data);

        let sttResult;
        try {
            sttResult = await transcribeAudio(audioBuffer, session.language || 'hi-IN');
        } catch (error) {
            console.error('[CALLS] recording STT failed:', error.message);
            return res.type('text/xml').send(exoResponse(
                '<Say voice="woman" language="hi">Maaf kijiye, awaaz saaf nahi mili. Kripya dobara boliye.</Say>'
                + buildRecordXml(buildWebhookUrl(req, '/calls/recording'))
            ));
        }

        const userText = String(sttResult.text || '').trim();
        console.log(`[CALL] User said: "${userText.slice(0, 80)}"`);

        if (!userText) {
            return res.type('text/xml').send(exoResponse(
                '<Say voice="woman" language="hi">Maaf kijiye, mujhe kuch samajh nahi aaya. Kripya dobara boliye.</Say>'
                + buildRecordXml(buildWebhookUrl(req, '/calls/recording'))
            ));
        }

        const nextTranscript = [...(session.transcript || []), { role: 'user', content: userText }];

        const [{ data: business, error: businessError }, { data: assistant, error: assistantError }] = await Promise.all([
            supabase.from('businesses').select('id, name, phone, plan').eq('id', session.business_id).single(),
            supabase.from('assistants').select('*').eq('id', session.assistant_id).maybeSingle(),
        ]);

        if (businessError) {
            throw businessError;
        }
        if (assistantError) {
            throw assistantError;
        }

        const systemPrompt = buildSystemPrompt(assistant || {
            language: session.language || 'hi-IN',
            industry: 'general',
            system_prompt: '',
        }, business);

        const llmResult = await generateResponse(nextTranscript, systemPrompt, assistant?.industry || 'general');

        nextTranscript.push({
            role: 'assistant',
            content: llmResult.response_text,
        });

        let leadData = session.lead_data;
        let leadCaptured = session.lead_captured;
        let leadAlertSent = session.lead_alert_sent;

        if (llmResult.lead_data && !leadCaptured) {
            leadData = await insertLeadIfCaptured(session, llmResult.lead_data, normalizePhoneNumber(From));
            leadCaptured = true;
            session.lead_data = leadData;

            sendLeadAlert(
                session.business_phone,
                leadData,
                { duration: RecordingDuration || 0, caller_number: normalizePhoneNumber(From) }
            ).then(() => {
                updateSession(sessionKey, { lead_alert_sent: true }).catch((updateError) => {
                    console.error('[CALLS] lead alert state update failed:', updateError.message);
                });
            }).catch((error) => {
                console.error('[WA] Alert failed:', error.message);
            });
            leadAlertSent = true;
        }

        try {
            await synthesizeSpeech(llmResult.response_text, session.language || 'hi-IN');
        } catch (error) {
            console.error('[CALLS] response synthesis failed:', error.message);
        }

        await updateSession(sessionKey, {
            transcript: nextTranscript,
            turn: Number(session.turn || 0) + 1,
            lead_captured: leadCaptured,
            lead_data: leadData,
            lead_alert_sent: leadAlertSent,
            tts_chars_total: Number(session.tts_chars_total || 0) + llmResult.response_text.length,
        });

        const responseXml = `<Say voice="woman" language="${escapeXml(session.language || 'hi-IN')}">${escapeXml(llmResult.response_text)}</Say>`;
        if (llmResult.should_end) {
            return res.type('text/xml').send(exoResponse(
                `${responseXml}<Say voice="woman" language="hi">Dhanyawad! Hamara agent aapko jald contact karega.</Say><Hangup/>`
            ));
        }

        return res.type('text/xml').send(exoResponse(
            `${responseXml}${buildRecordXml(buildWebhookUrl(req, '/calls/recording'))}`
        ));
    } catch (error) {
        console.error('[CALLS] recording failed:', error.message);
        return res.sendStatus(200);
    }
}

async function handleCallEnd(req, res) {
    try {
        const { CallSid, Duration } = req.body;
        console.log(`[EXOTEL] Call ended: ${CallSid}, ${Duration}s`);

        const sessionKey = `call:${CallSid}`;
        const session = await getSession(sessionKey);
        await deleteSession(sessionKey);

        if (!session) {
            return res.sendStatus(200);
        }

        const durationSeconds = parseInt(Duration || '0', 10);
        const durationMinutes = durationSeconds / 60;
        const costs = calculateCallCost(durationSeconds, session.tts_chars_total || 0);

        await supabase
            .from('calls')
            .update({
                status: 'completed',
                duration: durationSeconds,
                ended_at: new Date().toISOString(),
            })
            .eq('call_sid', CallSid);

        await supabase.from('usage_logs').insert({
            business_id: session.business_id,
            call_id: session.call_id,
            minutes_used: Math.ceil(durationMinutes),
            cost_stt: costs.cost_stt,
            cost_tts: costs.cost_tts,
            cost_telephony: costs.cost_telephony,
            cost_total: costs.cost_total,
        });

        const { data: business, error: businessError } = await supabase
            .from('businesses')
            .select('minutes_used, phone')
            .eq('id', session.business_id)
            .single();

        if (businessError) {
            throw businessError;
        }

        await supabase
            .from('businesses')
            .update({
                minutes_used: Number(business.minutes_used || 0) + Math.ceil(durationMinutes),
            })
            .eq('id', session.business_id);

        const summary = (session.transcript || []).length > 0
            ? `Call with ${session.transcript.length} turns. ${session.lead_captured ? 'Lead captured.' : 'No lead captured.'}`
            : 'Empty call.';

        await supabase.from('transcripts').insert({
            call_id: session.call_id,
            business_id: session.business_id,
            transcript: session.transcript || [],
            summary,
        });

        if (session.lead_captured && session.lead_data && !session.lead_alert_sent) {
            sendLeadAlert(
                session.business_phone || business.phone,
                session.lead_data,
                { duration: durationSeconds, caller_number: session.caller_number }
            ).catch((error) => {
                console.error('[WA] Final alert failed:', error.message);
            });
        }

        return res.sendStatus(200);
    } catch (error) {
        console.error('[CALLS] end failed:', error.message);
        return res.sendStatus(200);
    }
}

async function getCalls(req, res) {
    try {
        const { data, error } = await supabase
            .from('calls')
            .select('id, caller_number, duration, status, created_at')
            .eq('business_id', req.user.id)
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) {
            throw error;
        }

        return res.status(200).json({ success: true, data: data || [] });
    } catch (error) {
        console.error('[CALLS] getCalls failed:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

async function getCallById(req, res) {
    try {
        const { data, error } = await supabase
            .from('calls')
            .select('*, transcripts(transcript, summary), leads(name, phone, intent, budget)')
            .eq('id', req.params.id)
            .eq('business_id', req.user.id)
            .maybeSingle();

        if (error) {
            throw error;
        }

        if (!data) {
            return res.status(404).json({ success: false, error: 'Call not found' });
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('[CALLS] getCallById failed:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    handleIncomingExotel,
    handleRecording,
    handleCallEnd,
    getCalls,
    getCallById,
};
