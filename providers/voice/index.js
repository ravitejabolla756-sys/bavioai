const SarvamAI = require('sarvamai');
const { ChatClient } = require('sarvamai/chat');
const { SpeechToTextStreamingClient } = require('sarvamai/speechToTextStreaming');
const { SarvamAIClient } = require('sarvamai');

const { retry } = require('../../utils/retry');
const { createStubVoiceProviders } = require('./stubProviders');
const { wrapPcmAsWav } = require('../../services/audio/audioProcessing');

class SarvamSttProvider {
    constructor(config) {
        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl;
        this.client = new SpeechToTextStreamingClient({
            apiSubscriptionKey: config.apiKey,
            baseUrl: config.baseUrl,
            maxRetries: 2,
            timeoutInSeconds: 30,
        });
    }

    async createStream({ languageCode, sampleRate, prompt, onTranscript, onEvent, onError }) {
        let isClosed = false;
        const socket = await retry(
            () => this.client.connect({
                'Api-Subscription-Key': this.apiKey,
                'language-code': languageCode || 'en-IN',
                model: 'saaras:v3',
                input_audio_codec: 'pcm_s16le',
                sample_rate: String(sampleRate || 16000),
                high_vad_sensitivity: 'true',
                vad_signals: 'true',
                flush_signal: 'true',
            }),
            { label: 'sarvam-stt-connect' }
        );

        socket.on('message', (message) => {
            if (message.type === 'data' && message.data?.transcript) {
                onTranscript(message.data);
                return;
            }

            if (message.type === 'events') {
                onEvent(message.data);
                return;
            }

            if (message.type === 'error') {
                isClosed = true;
                onError(new Error(message.data?.message || 'Sarvam STT stream error.'));
            }
        });

        socket.on('error', (error) => {
            isClosed = true;
            onError(error);
        });
        socket.connect();
        await socket.waitForOpen();

        if (prompt) {
            socket.sendConfigMessage({ type: 'config', prompt });
        }

        return {
            sendAudio(audioBase64) {
                if (isClosed || socket.readyState !== 1) {
                    return;
                }

                const wavAudio = wrapPcmAsWav(Buffer.from(audioBase64, 'base64'), sampleRate || 16000);
                socket.transcribe({
                    audio: wavAudio.toString('base64'),
                    sample_rate: sampleRate || 16000,
                    encoding: 'audio/wav',
                });
            },
            flush() {
                if (!isClosed && socket.readyState === 1) {
                    socket.flush();
                }
            },
            close() {
                isClosed = true;
                socket.close();
            },
        };
    }
}

class SarvamLlmProvider {
    constructor(config) {
        this.client = new ChatClient({
            apiSubscriptionKey: config.apiKey,
            baseUrl: config.baseUrl,
            maxRetries: 2,
            timeoutInSeconds: 60,
        });
    }

    async streamResponse({ messages, abortSignal, onToken }) {
        const stream = await this.client.completions({
            messages,
            model: process.env.SARVAM_LLM_MODEL || 'sarvam-m',
            stream: true,
            temperature: 0.2,
            max_tokens: 256,
        }, {
            abortSignal,
            maxRetries: 2,
            timeoutInSeconds: 60,
        });

        let finalText = '';

        for await (const chunk of stream) {
            const token = chunk.choices?.[0]?.delta?.content || '';
            if (!token) continue;
            finalText += token;
            await onToken(token);
        }

        return { text: finalText.trim() };
    }
}

class SarvamTtsProvider {
    constructor(config) {
        this.client = new SarvamAIClient({
            apiSubscriptionKey: config.apiKey,
            baseUrl: config.baseUrl,
            maxRetries: 2,
            timeoutInSeconds: 60,
        });
    }

    async createStream({ languageCode, speaker, onAudio, onComplete, onError }) {
        const queue = [];
        let processing = false;
        let closed = false;

        const processNext = async () => {
            if (processing || closed || queue.length === 0) {
                return;
            }

            processing = true;
            const text = queue.shift();

            try {
                const response = await retry(
                    () => this.client.textToSpeech.convertStream({
                        text,
                        model: 'bulbul:v3',
                        target_language_code: languageCode || 'en-IN',
                        speaker: speaker || 'aditya',
                        speech_sample_rate: 16000,
                        output_audio_codec: 'linear16',
                        temperature: 0.2,
                    }),
                    { label: 'sarvam-tts-stream' }
                );

                const reader = response.stream().getReader();

                while (!closed) {
                    const { done, value } = await reader.read();
                    if (done) {
                        break;
                    }

                    onAudio({
                        audioBase64: Buffer.from(value).toString('base64'),
                        contentType: 'audio/pcm',
                        codec: 'linear16',
                        sampleRate: 16000,
                    });
                }
            } catch (error) {
                onError(error);
            } finally {
                processing = false;
                if (queue.length === 0) {
                    onComplete();
                } else {
                    processNext().catch(onError);
                }
            }
        };

        return {
            pushText(text) {
                if (text && text.trim()) {
                    queue.push(text.trim());
                    processNext().catch(onError);
                }
            },
            flush() {
                if (!processing && queue.length === 0) {
                    onComplete();
                }
            },
            close() {
                closed = true;
            },
        };
    }
}

function createVoiceProviders() {
    if (process.env.VOICE_PROVIDER_MODE === 'stub') {
        return createStubVoiceProviders();
    }

    if (!process.env.SARVAM_API_KEY) {
        throw new Error('SARVAM_API_KEY is required for realtime voice providers.');
    }

    const config = {
        apiKey: process.env.SARVAM_API_KEY,
        baseUrl: process.env.SARVAM_BASE_URL || undefined,
    };

    return {
        sdk: SarvamAI,
        stt: new SarvamSttProvider(config),
        llm: new SarvamLlmProvider(config),
        tts: new SarvamTtsProvider(config),
    };
}

module.exports = { createVoiceProviders };
