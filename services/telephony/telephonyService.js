const supabase = require('../../database/db');
const realtimeService = require('../realtime/realtimeService');
const sessionStore = require('../realtime/sessionStore');
const { convertOutputAudio } = require('../audio/audioProcessing');

const TWILIO_FRAME_MS = 20;
const EXOTEL_FRAME_MS = 100;

function xmlEscape(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function buildWebSocketUrl(req, provider, sessionId, callSid) {
    const protocol = req.headers['x-forwarded-proto'] || (req.secure ? 'https' : 'http');
    const wsProtocol = protocol === 'https' ? 'wss' : 'ws';
    const host = req.get('host');
    return `${wsProtocol}://${host}/realtime/ws?provider=${provider}&session_id=${sessionId}&call_sid=${encodeURIComponent(callSid)}`;
}

async function resolveBusinessIdFromNumber(number) {
    if (!number) {
        return null;
    }

    try {
        const { data } = await supabase
            .from('phone_numbers')
            .select('business_id')
            .eq('number', number)
            .maybeSingle();

        return data?.business_id || null;
    } catch (error) {
        console.warn('[telephonyService.resolveBusinessIdFromNumber]', error.message);
        return null;
    }
}

function normalizeTwilioWebhook(body) {
    return {
        provider: 'twilio',
        callSid: body.CallSid || body.call_sid || body.callSid,
        from: body.From || body.from,
        to: body.To || body.to,
    };
}

function normalizeExotelWebhook(body) {
    return {
        provider: 'exotel',
        callSid: body.CallSid || body.call_sid || body.sid || body.CallUUID,
        from: body.From || body.from || body.Caller || body.caller,
        to: body.To || body.to || body.Called || body.called,
    };
}

async function ensureSessionForCall(normalizedCall) {
    const existingSessionId = await sessionStore.getSessionIdByCall(normalizedCall.provider, normalizedCall.callSid);
    if (existingSessionId) {
        const existingSession = await sessionStore.get(existingSessionId);
        if (existingSession) {
            return existingSessionId;
        }
    }

    const businessId =
        (await resolveBusinessIdFromNumber(normalizedCall.to)) ||
        process.env.DEFAULT_BUSINESS_ID ||
        'telephony-unmapped';

    const session = await realtimeService.createSession({
        businessId,
        assistantId: null,
        voice: process.env.SARVAM_TTS_SPEAKER || 'aditya',
        metadata: {
            language_code: process.env.SARVAM_LANGUAGE_CODE || 'en-IN',
            provider: normalizedCall.provider,
            call_sid: normalizedCall.callSid,
            from: normalizedCall.from,
            to: normalizedCall.to,
            telephony: {
                provider: normalizedCall.provider,
            },
        },
    });

    await sessionStore.createCallMapping(normalizedCall.provider, normalizedCall.callSid, session.id, normalizedCall);
    return session.id;
}

async function buildTwilioWebhookResponse(req) {
    const normalizedCall = normalizeTwilioWebhook(req.body);
    const sessionId = await ensureSessionForCall(normalizedCall);
    const wsUrl = buildWebSocketUrl(req, 'twilio', sessionId, normalizedCall.callSid);

    return {
        sessionId,
        body: [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<Response>',
            '  <Connect>',
            `    <Stream url="${xmlEscape(wsUrl)}" />`,
            '  </Connect>',
            '</Response>',
        ].join(''),
        contentType: 'text/xml',
    };
}

async function buildExotelWebhookResponse(req) {
    const normalizedCall = normalizeExotelWebhook(req.body);
    const sessionId = await ensureSessionForCall(normalizedCall);
    const wsUrl = buildWebSocketUrl(req, 'exotel', sessionId, normalizedCall.callSid);

    return {
        sessionId,
        body: {
            url: wsUrl,
            websocket_url: wsUrl,
        },
        contentType: 'application/json',
    };
}

function normalizeTwilioWsMessage(message) {
    switch (message.event) {
        case 'connected':
            return { type: 'call.connected' };
        case 'start':
            return {
                type: 'call.started',
                callSid: message.start?.callSid || message.start?.call_sid,
                streamSid: message.start?.streamSid || message.streamSid,
                tracks: message.start?.tracks || [],
            };
        case 'media':
            return {
                type: 'audio.input',
                audioBase64: message.media?.payload,
                codec: 'mulaw',
                sampleRate: 8000,
            };
        case 'stop':
            return {
                type: 'call.ended',
                callSid: message.stop?.callSid || message.stop?.call_sid,
            };
        default:
            return { type: 'unknown' };
    }
}

function normalizeExotelWsMessage(message) {
    switch (message.event || message.type) {
        case 'connected':
            return { type: 'call.connected' };
        case 'start':
            return {
                type: 'call.started',
                callSid: message.start?.callSid || message.call_sid || message.callSid,
                streamSid: message.start?.streamSid || message.stream_sid || message.streamSid,
            };
        case 'media':
            return {
                type: 'audio.input',
                audioBase64: message.media?.payload || message.audio?.data || message.media?.audio,
                codec: message.media?.codec || message.audio?.codec || 'pcm_s16le',
                sampleRate: Number(message.media?.sampleRate || message.audio?.sample_rate || 8000),
            };
        case 'stop':
        case 'call.ended':
            return {
                type: 'call.ended',
                callSid: message.stop?.callSid || message.call_sid || message.callSid,
            };
        default:
            return { type: 'unknown' };
    }
}

function normalizeWsMessage(provider, message) {
    if (provider === 'twilio') {
        return normalizeTwilioWsMessage(message);
    }
    return normalizeExotelWsMessage(message);
}

function splitAudioFrames(buffer, bytesPerFrame) {
    const frames = [];
    for (let offset = 0; offset < buffer.length; offset += bytesPerFrame) {
        frames.push(buffer.subarray(offset, Math.min(offset + bytesPerFrame, buffer.length)));
    }
    return frames;
}

function bytesPerFrame(codec, sampleRate, frameMs) {
    if (codec === 'mulaw') {
        return Math.max(1, Math.round(sampleRate * (frameMs / 1000)));
    }
    return Math.max(2, Math.round(sampleRate * 2 * (frameMs / 1000)));
}

function buildProviderAudioMessage(connection, audio) {
    if (!connection.streamSid) {
        return [];
    }

    if (connection.provider === 'twilio') {
        const converted = convertOutputAudio({
            audioBase64: audio.audioBase64,
            codec: audio.codec || 'linear16',
            sampleRate: audio.sampleRate || 16000,
            targetCodec: 'mulaw',
            targetSampleRate: 8000,
        });

        return splitAudioFrames(converted.buffer, bytesPerFrame('mulaw', 8000, TWILIO_FRAME_MS)).map((frame) => ({
            event: 'media',
            streamSid: connection.streamSid,
            media: {
                payload: frame.toString('base64'),
            },
        }));
    }

    const converted = convertOutputAudio({
        audioBase64: audio.audioBase64,
        codec: audio.codec || 'linear16',
        sampleRate: audio.sampleRate || 16000,
        targetCodec: 'pcm_s16le',
        targetSampleRate: 8000,
    });

    return splitAudioFrames(converted.buffer, bytesPerFrame('pcm_s16le', 8000, EXOTEL_FRAME_MS)).map((frame) => ({
        event: 'media',
        stream_sid: connection.streamSid,
        media: {
            payload: frame.toString('base64'),
            codec: 'pcm_s16le',
            sampleRate: 8000,
        },
    }));
}

function buildClearMessage(connection) {
    if (!connection.streamSid) {
        return null;
    }

    if (connection.provider === 'twilio') {
        return {
            event: 'clear',
            streamSid: connection.streamSid,
        };
    }

    return {
        event: 'clear',
        stream_sid: connection.streamSid,
    };
}

async function finalizeCall(provider, callSid, metadata) {
    const sessionId = await sessionStore.getSessionIdByCall(provider, callSid);
    if (!sessionId) {
        return null;
    }

    await sessionStore.storeCallMetadata(provider, callSid, metadata);
    return sessionId;
}

module.exports = {
    buildClearMessage,
    buildExotelWebhookResponse,
    buildProviderAudioMessage,
    buildTwilioWebhookResponse,
    ensureSessionForCall,
    finalizeCall,
    normalizeExotelWebhook,
    normalizeTwilioWebhook,
    normalizeWsMessage,
};
