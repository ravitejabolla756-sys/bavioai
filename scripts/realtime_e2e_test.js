const jwt = require('jsonwebtoken');
const WebSocket = require('ws');

async function main() {
    process.env.PORT = '4040';
    process.env.VOICE_PROVIDER_MODE = 'stub';
    process.env.USE_INMEMORY_SESSION_STORE = 'true';

    const { server } = require('../server');
    console.log('server-started');
    const token = jwt.sign(
        { business_id: 'test-biz', email: 'test@example.com' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    await new Promise((resolve) => setTimeout(resolve, 250));

    const createRes = await fetch('http://127.0.0.1:4040/realtime/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ welcome_message: 'Hello from test mode' }),
    });

    const sessionPayload = await createRes.json();
    console.log('session-created', createRes.status);
    if (!createRes.ok) {
        throw new Error(`Session creation failed: ${JSON.stringify(sessionPayload)}`);
    }

    const events = [];
    const ws = new WebSocket(sessionPayload.session.websocket_url);

    await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error(`Timed out waiting for audio.output. Events: ${JSON.stringify(events)}`));
        }, 6000);

        ws.on('open', () => {
            console.log('ws-open');
            const fakePcm = Buffer.alloc(320, 1).toString('base64');
            ws.send(JSON.stringify({
                type: 'audio.input',
                audio: fakePcm,
                codec: 'pcm_s16le',
                sample_rate: 16000,
            }));

            setTimeout(() => {
                console.log('audio-commit');
                ws.send(JSON.stringify({ type: 'audio.commit' }));
            }, 100);
        });

        ws.on('message', (raw) => {
            const message = JSON.parse(raw.toString());
            console.log('ws-message', message.type);
            events.push(message.type);

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
