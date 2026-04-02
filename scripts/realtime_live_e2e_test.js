const jwt = require('jsonwebtoken');
const WebSocket = require('ws');

const { createVoiceProviders } = require('../providers/voice');

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

    await new Promise((resolve) => setTimeout(resolve, 2500));
    stream.close();

    if (streamError) {
        throw streamError;
    }

    return Buffer.concat(audioBuffers).toString('base64');
}

async function main() {
    process.env.PORT = '4041';
    process.env.USE_INMEMORY_SESSION_STORE = 'true';
    delete process.env.VOICE_PROVIDER_MODE;

    const { server } = require('../server');
    const token = jwt.sign(
        { business_id: 'test-biz', email: 'test@example.com' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    await new Promise((resolve) => setTimeout(resolve, 500));

    const inputAudioBase64 = await synthesizeInputAudio();
    if (!inputAudioBase64) {
        throw new Error('Could not synthesize input audio from Sarvam TTS.');
    }

    const createRes = await fetch('http://127.0.0.1:4041/realtime/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ welcome_message: 'Hello from live test mode' }),
    });

    const sessionPayload = await createRes.json();
    if (!createRes.ok) {
        throw new Error(`Session creation failed: ${JSON.stringify(sessionPayload)}`);
    }

    const events = [];
    const ws = new WebSocket(sessionPayload.session.websocket_url);

    await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error(`Timed out waiting for audio.output. Events: ${JSON.stringify(events)}`));
        }, 25000);

        ws.on('open', () => {
            ws.send(JSON.stringify({
                type: 'audio.input',
                audio: inputAudioBase64,
                codec: 'pcm_s16le',
                sample_rate: 16000,
            }));

            setTimeout(() => {
                ws.send(JSON.stringify({ type: 'audio.commit' }));
            }, 500);
        });

        ws.on('message', (raw) => {
            const message = JSON.parse(raw.toString());
            events.push(message.type);

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

    console.log(JSON.stringify({ ok: true, events }, null, 2));

    ws.close();
    await new Promise((resolve) => server.close(resolve));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
