const jwt = require('jsonwebtoken');
const WebSocket = require('ws');

const { createVoiceProviders } = require('../providers/voice');
const { getRedisClient } = require('../services/redisClient');

async function synthesizeInputAudio() {
    const providers = createVoiceProviders();
    const audioBuffers = [];
    let streamError = null;

    const stream = await providers.tts.createStream({
        languageCode: process.env.SARVAM_LANGUAGE_CODE || 'en-IN',
        speaker: process.env.SARVAM_TTS_SPEAKER || 'aditya',
        onAudio: (audioChunk) => {
            audioBuffers.push(Buffer.from(audioChunk.audioBase64, 'base64'));
        },
        onComplete: () => {},
        onError: (error) => {
            streamError = error;
        },
    });

    stream.pushText('Hello, I need help with my order.');
    stream.flush();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    stream.close();

    if (streamError) {
        throw streamError;
    }

    const combined = Buffer.concat(audioBuffers);
    if (!combined.length) {
        throw new Error('Could not synthesize input audio from Sarvam TTS for Redis-backed test.');
    }

    return combined.toString('base64');
}

async function inspectRedisSession(sessionId) {
    const client = await getRedisClient();
    const sessionPayload = await client.get(`realtime:session:${sessionId}`);
    const transcript = await client.lRange(`realtime:session:${sessionId}:transcript`, 0, -1);
    const connections = await client.hGetAll(`realtime:session:${sessionId}:connections`);

    return {
        sessionExists: Boolean(sessionPayload),
        transcriptCount: transcript.length,
        connectionCount: Object.keys(connections).length,
    };
}

async function main() {
    process.env.PORT = '4042';
    process.env.REDIS_SESSION_DEBUG = 'true';
    process.env.REALTIME_DEBUG = 'true';
    delete process.env.USE_INMEMORY_SESSION_STORE;
    delete process.env.VOICE_PROVIDER_MODE;

    const { server } = require('../server');
    const token = jwt.sign(
        { business_id: 'test-biz', email: 'test@example.com' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    await new Promise((resolve) => setTimeout(resolve, 500));
    const inputAudioBase64 = await synthesizeInputAudio();

    const createRes = await fetch('http://127.0.0.1:4042/realtime/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ welcome_message: 'Hello from redis live test mode' }),
    });

    const sessionPayload = await createRes.json();
    if (!createRes.ok) {
        throw new Error(`Session creation failed: ${JSON.stringify(sessionPayload)}`);
    }

    const sessionId = sessionPayload.session.id;
    const initialRedisState = await inspectRedisSession(sessionId);

    const events = [];
    const ws = new WebSocket(sessionPayload.session.websocket_url);

    await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error(`Timed out waiting for audio.output. Events: ${JSON.stringify(events)}`));
        }, 30000);

        ws.on('message', (raw) => {
            const message = JSON.parse(raw.toString());
            events.push(message.type);

            if (message.type === 'session.ready') {
                const audioBuffer = Buffer.from(inputAudioBase64, 'base64');
                const chunkSize = 3200;
                let offset = 0;

                const sendNextChunk = () => {
                    if (offset >= audioBuffer.length) {
                        setTimeout(() => {
                            ws.send(JSON.stringify({ type: 'audio.commit' }));
                        }, 500);
                        return;
                    }

                    const chunk = audioBuffer.subarray(offset, Math.min(offset + chunkSize, audioBuffer.length));
                    offset += chunkSize;
                    ws.send(JSON.stringify({
                        type: 'audio.input',
                        audio: chunk.toString('base64'),
                        codec: 'pcm_s16le',
                        sample_rate: 16000,
                    }));

                    setTimeout(sendNextChunk, 30);
                };

                sendNextChunk();
            }

            if (message.type === 'error') {
                clearTimeout(timeout);
                reject(new Error(`Pipeline error: ${JSON.stringify(message)}`));
                return;
            }

            if (message.type === 'audio.output') {
                clearTimeout(timeout);
                resolve();
            }
        });

        ws.on('error', (error) => {
            clearTimeout(timeout);
            reject(error);
        });
    });

    const finalRedisState = await inspectRedisSession(sessionId);

    console.log(JSON.stringify({
        ok: true,
        sessionId,
        initialRedisState,
        finalRedisState,
        events,
    }, null, 2));

    ws.close();
    await new Promise((resolve) => setTimeout(resolve, 500));
    await new Promise((resolve) => server.close(resolve));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
