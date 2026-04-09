function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

class StubSttProvider {
    async createStream({ onTranscript, onEvent }) {
        const state = {
            audioChunks: [],
        };

        return {
            sendAudio(audioBase64) {
                state.audioChunks.push(audioBase64);
                onEvent({ signal_type: 'START_SPEECH' });
            },
            flush() {
                const chunkCount = state.audioChunks.length;
                const transcript = chunkCount
                    ? `Stub transcript from ${chunkCount} audio chunk${chunkCount === 1 ? '' : 's'}`
                    : '';

                if (transcript) {
                    onTranscript({
                        request_id: `stub-${Date.now()}`,
                        transcript,
                        metrics: { provider: 'stub-stt' },
                    });
                }

                onEvent({ signal_type: 'END_SPEECH' });
                state.audioChunks = [];
            },
            close() {},
        };
    }
}

class StubLlmProvider {
    async streamResponse({ messages, onToken, abortSignal }) {
        const lastUser = [...messages].reverse().find((message) => message.role === 'user');
        const text = `Stub assistant reply to: ${lastUser?.content || 'hello'}`;

        for (const token of text.split(' ')) {
            if (abortSignal?.aborted) {
                const error = new Error('Aborted');
                error.name = 'AbortError';
                throw error;
            }

            await wait(10);
            await onToken(`${token} `);
        }

        return { text };
    }
}

class StubTtsProvider {
    async createStream({ onAudio, onComplete }) {
        return {
            pushText(text) {
                if (!text) return;
                onAudio({
                    audioBase64: Buffer.from(`audio:${text}`, 'utf8').toString('base64'),
                    codec: 'linear16',
                    sampleRate: 16000,
                    contentType: 'audio/pcm',
                });
            },
            flush() {
                onComplete();
            },
            close() {},
        };
    }
}

function createStubVoiceProviders() {
    return {
        stt: new StubSttProvider(),
        llm: new StubLlmProvider(),
        tts: new StubTtsProvider(),
    };
}

module.exports = { createStubVoiceProviders };
