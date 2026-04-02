const WebSocket = require('ws');

const { getRedisClient } = require('../services/redisClient');

async function inspectCallMapping(provider, callSid) {
    const client = await getRedisClient();
    const sessionId = await client.get(`realtime:call-map:${provider}:${callSid}`);
    return { sessionId };
}

async function runProviderFlow({ provider, webhookUrl, webhookBody, websocketEventBuilder }) {
    const basePort = 4043;

    const webhookRes = await fetch(`http://127.0.0.1:${basePort}${webhookUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookBody),
    });

    const contentType = webhookRes.headers.get('content-type') || '';
    const rawWebhookPayload = contentType.includes('application/json')
        ? await webhookRes.json()
        : await webhookRes.text();

    let wsUrl;
    if (provider === 'twilio') {
        const match = String(rawWebhookPayload).match(/url="([^"]+)"/);
        wsUrl = match && match[1] && match[1].replace(/&amp;/g, '&');
    } else {
        wsUrl = rawWebhookPayload.websocket_url || rawWebhookPayload.url;
    }

    if (!wsUrl) {
        throw new Error(`${provider} webhook did not return a websocket URL.`);
    }

    const callSid = webhookBody.CallSid || webhookBody.call_sid;
    const mapping = await inspectCallMapping(provider, callSid);
    if (!mapping.sessionId) {
        throw new Error(`${provider} call did not create a Redis session mapping.`);
    }

    const ws = new WebSocket(wsUrl);
    const receivedMessages = [];

    await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error(`${provider} telephony flow timed out. Messages: ${JSON.stringify(receivedMessages)}`));
        }, 30000);

        ws.on('open', () => {
            const messages = websocketEventBuilder(callSid);
            for (const message of messages) {
                ws.send(JSON.stringify(message));
            }
        });

        ws.on('message', (raw) => {
            const message = JSON.parse(raw.toString());
            receivedMessages.push(message.event || message.type);

            const isAudioMessage = provider === 'twilio'
                ? message.event === 'media' && Boolean(message.media?.payload)
                : message.event === 'media' && Boolean(message.media?.payload);

            if (isAudioMessage) {
                clearTimeout(timeout);
                resolve();
            }
        });

        ws.on('error', (error) => {
            clearTimeout(timeout);
            reject(error);
        });
    });

    ws.close();
    return {
        ok: true,
        provider,
        sessionId: mapping.sessionId,
        receivedMessages,
    };
}

async function main() {
    process.env.PORT = '4043';
    process.env.REDIS_SESSION_DEBUG = 'true';
    process.env.REALTIME_DEBUG = 'true';
    delete process.env.USE_INMEMORY_SESSION_STORE;
    delete process.env.VOICE_PROVIDER_MODE;

    const { server } = require('../server');
    await new Promise((resolve) => setTimeout(resolve, 500));

    const pcmAudio = Buffer.alloc(640, 1).toString('base64');

    const twilioResult = await runProviderFlow({
        provider: 'twilio',
        webhookUrl: '/webhooks/twilio',
        webhookBody: {
            CallSid: 'CA_TEST_TWILIO_123',
            From: '+14155550100',
            To: '+14155550199',
        },
        websocketEventBuilder(callSid) {
            return [
                { event: 'connected', protocol: 'Call', version: '1.0.0' },
                { event: 'start', start: { callSid, streamSid: 'MZ_TWILIO_STREAM_1', tracks: ['inbound'] } },
                { event: 'media', streamSid: 'MZ_TWILIO_STREAM_1', media: { payload: pcmAudio } },
            ];
        },
    });

    const exotelResult = await runProviderFlow({
        provider: 'exotel',
        webhookUrl: '/webhooks/exotel',
        webhookBody: {
            call_sid: 'EXOTEL_CALL_123',
            from: '+918000000001',
            to: '+918000000099',
        },
        websocketEventBuilder(callSid) {
            return [
                { event: 'connected' },
                { event: 'start', call_sid: callSid, stream_sid: 'EXOTEL_STREAM_1' },
                { event: 'media', stream_sid: 'EXOTEL_STREAM_1', media: { payload: pcmAudio, codec: 'pcm_s16le', sampleRate: 8000 } },
            ];
        },
    });

    console.log(JSON.stringify({ twilioResult, exotelResult }, null, 2));

    await new Promise((resolve) => setTimeout(resolve, 500));
    await new Promise((resolve) => server.close(resolve));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
