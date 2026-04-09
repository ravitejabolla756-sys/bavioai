const axios = require('axios');

const { supabase } = require('../database/db');
const { buildExoML } = require('../services/exotelService');
const { getSession, setSession, updateSession, deleteSession } = require('../services/redisService');
const { processTurn } = require('../services/orchestratorService');
const { generateResponse } = require('../services/llmService');
const { sendLeadAlert } = require('../services/whatsappService');
const { calculateCallCost } = require('../services/billingService');

function normalizePhoneNumber(value) {
    return String(value || '').replace(/[^\d+]/g, '');
}

async function findBusinessPhoneNumber(toNumber) {
    const normalizedTo = normalizePhoneNumber(toNumber);
    const { data, error } = await supabase
        .from('phone_numbers')
        .select('*')
        .eq('phone_number', normalizedTo)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;
}

async function getAssistantConfig(businessId) {
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

    return data || {
        name: 'Bavio Assistant',
        language: 'hi-IN',
        first_message: 'Namaste! Main aapki kaise madad kar sakta hoon?',
        industry: 'general',
        system_prompt: '',
    };
}

async function upsertLead({ businessId, callId, callerNumber, leadData }) {
    if (!leadData) {
        return null;
    }

    const { data: existing, error: existingError } = await supabase
        .from('leads')
        .select('*')
        .eq('business_id', businessId)
        .eq('call_id', callId)
        .maybeSingle();

    if (existingError) {
        throw existingError;
    }

    const payload = {
        business_id: businessId,
        call_id: callId,
        name: leadData.name || existing?.name || null,
        phone: leadData.phone || callerNumber || existing?.phone || null,
        email: leadData.email || existing?.email || null,
        intent: leadData.intent || existing?.intent || null,
        budget: leadData.budget || existing?.budget || null,
        location: leadData.location || existing?.location || null,
        notes: leadData.notes || existing?.notes || null,
        status: existing?.status || 'new',
    };

    const query = existing
        ? supabase.from('leads').update(payload).eq('id', existing.id)
        : supabase.from('leads').insert([payload]);

    const { data, error } = await query.select('*').single();

    if (error) {
        throw error;
    }

    return data;
}

async function handleIncomingExotel(req, res) {
    try {
        const callSid = req.body?.CallSid;
        const from = normalizePhoneNumber(req.body?.From);
        const to = normalizePhoneNumber(req.body?.To);

        const numberRecord = await findBusinessPhoneNumber(to);

        if (!numberRecord) {
            return res.status(404).type('application/xml').send(buildExoML('hangup'));
        }

        const { data: call, error: callError } = await supabase
            .from('calls')
            .insert([{
                business_id: numberRecord.business_id,
                phone_number_id: numberRecord.id,
                caller_number: from,
                call_sid: callSid,
                provider: 'exotel',
                status: 'started',
            }])
            .select('*')
            .single();

        if (callError) {
            console.error('[CALLS] incoming: call create failed', callError.message);
            return res.status(500).json({ success: false, error: callError.message });
        }

        await setSession(callSid, {
            business_id: numberRecord.business_id,
            call_id: call.id,
            transcript: [],
            turn: 0,
        });

        const assistant = await getAssistantConfig(numberRecord.business_id);
        const actionUrl = `${process.env.WEBHOOK_BASE_URL}/calls/recording`;

        return res.status(200).type('application/xml').send(buildExoML([
            { action: 'say', params: { text: assistant.first_message } },
            { action: 'record', params: { action: actionUrl, maxLength: 10, playBeep: false } },
        ]));
    } catch (error) {
        console.error('[CALLS] incoming:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

async function handleRecording(req, res) {
    try {
        const callSid = req.body?.CallSid;
        const recordingUrl = req.body?.RecordingUrl;
        const session = await getSession(callSid);

        if (!session) {
            return res.status(404).json({ success: false, error: 'Session not found' });
        }

        const [{ data: business }, { data: assistant }, { data: call }] = await Promise.all([
            supabase.from('businesses').select('*').eq('id', session.business_id).single(),
            supabase.from('assistants').select('*').eq('business_id', session.business_id).order('created_at', { ascending: false }).limit(1).maybeSingle(),
            supabase.from('calls').select('*').eq('id', session.call_id).single(),
        ]);

        const audioResponse = await axios.get(recordingUrl, {
            responseType: 'arraybuffer',
            timeout: 30000,
        });

        const result = await processTurn({
            callSid,
            audioBuffer: Buffer.from(audioResponse.data),
            sessionData: session,
            assistantConfig: assistant || {
                language: 'hi-IN',
                industry: 'general',
                system_prompt: '',
                first_message: 'Namaste!',
            },
            business,
        });

        const lead = await upsertLead({
            businessId: session.business_id,
            callId: session.call_id,
            callerNumber: call?.caller_number,
            leadData: result.leadData,
        });

        await updateSession(callSid, {
            latest_lead_id: lead?.id || null,
            latest_response_text: result.responseText,
        });

        const recordAction = `${process.env.WEBHOOK_BASE_URL}/calls/recording`;
        const actions = [];

        if (result.responseAudio) {
            actions.push({
                action: 'play',
                params: { url: `data:audio/wav;base64,${result.responseAudio}` },
            });
        } else {
            actions.push({
                action: 'say',
                params: { text: result.responseText },
            });
        }

        if (result.shouldEnd) {
            actions.push({ action: 'hangup', params: {} });
        } else {
            actions.push({
                action: 'record',
                params: { action: recordAction, maxLength: 10, playBeep: false },
            });
        }

        return res.status(200).type('application/xml').send(buildExoML(actions));
    } catch (error) {
        console.error('[CALLS] recording:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

async function handleCallEnd(req, res) {
    try {
        const callSid = req.body?.CallSid;
        const duration = Number(req.body?.Duration || 0);
        const session = await getSession(callSid);

        if (!session) {
            return res.status(200).json({ success: true, data: { message: 'Session already cleaned up' } });
        }

        const transcript = Array.isArray(session.transcript) ? session.transcript : [];
        const ttsChars = transcript
            .filter((item) => item.role === 'assistant')
            .reduce((sum, item) => sum + String(item.content || '').length, 0);
        const costs = calculateCallCost(duration, ttsChars);

        const { error: callUpdateError } = await supabase
            .from('calls')
            .update({
                status: 'completed',
                duration,
                cost: costs.cost_total,
                ended_at: new Date().toISOString(),
            })
            .eq('id', session.call_id);

        if (callUpdateError) {
            throw callUpdateError;
        }

        const { error: usageError } = await supabase
            .from('usage_logs')
            .insert([{
                business_id: session.business_id,
                call_id: session.call_id,
                minutes_used: Math.ceil(duration / 60),
                ...costs,
            }]);

        if (usageError) {
            throw usageError;
        }

        const { data: business, error: businessError } = await supabase
            .from('businesses')
            .select('*')
            .eq('id', session.business_id)
            .single();

        if (businessError) {
            throw businessError;
        }

        await supabase
            .from('businesses')
            .update({
                minutes_used: Number(business.minutes_used || 0) + Math.ceil(duration / 60),
                updated_at: new Date().toISOString(),
            })
            .eq('id', session.business_id);

        const summaryPrompt = 'Summarize this sales or support phone call in 3 concise sentences.';
        const summaryResult = await generateResponse(
            transcript.map((item) => ({ role: item.role, content: item.content })),
            summaryPrompt,
            'general'
        );

        const { error: transcriptError } = await supabase
            .from('transcripts')
            .insert([{
                call_id: session.call_id,
                business_id: session.business_id,
                transcript,
                summary: summaryResult.response_text,
            }]);

        if (transcriptError) {
            throw transcriptError;
        }

        const { data: lead } = await supabase
            .from('leads')
            .select('*')
            .eq('call_id', session.call_id)
            .eq('business_id', session.business_id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (lead && business.phone) {
            await sendLeadAlert(business.phone, lead, { duration, caller_number: req.body?.From });
        }

        await deleteSession(callSid);

        return res.status(200).json({ success: true, data: { message: 'Call processed' } });
    } catch (error) {
        console.error('[CALLS] end:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

async function getCallsForBusiness(req, res) {
    try {
        const page = Math.max(1, Number(req.query.page || 1));
        const pageSize = Math.min(50, Math.max(1, Number(req.query.limit || 10)));
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        const { data, error, count } = await supabase
            .from('calls')
            .select('*, transcripts(*), leads(*)', { count: 'exact' })
            .eq('business_id', req.user.id)
            .order('created_at', { ascending: false })
            .range(from, to);

        if (error) {
            console.error('[CALLS] list:', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }

        return res.status(200).json({
            success: true,
            data: {
                page,
                page_size: pageSize,
                total: count || 0,
                calls: data || [],
            },
        });
    } catch (error) {
        console.error('[CALLS] list:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

async function getCallById(req, res) {
    try {
        const { data, error } = await supabase
            .from('calls')
            .select('*, transcripts(*), leads(*)')
            .eq('id', req.params.id)
            .eq('business_id', req.user.id)
            .maybeSingle();

        if (error) {
            console.error('[CALLS] getById:', error.message);
            return res.status(500).json({ success: false, error: error.message });
        }

        if (!data) {
            return res.status(404).json({ success: false, error: 'Call not found' });
        }

        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('[CALLS] getById:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    handleIncomingExotel,
    handleRecording,
    handleCallEnd,
    getCallsForBusiness,
    getCallById,
};
