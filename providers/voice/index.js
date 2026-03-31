const SarvamAI = require('sarvamai');
const { ChatClient } = require('sarvamai/chat');
const { SpeechToTextStreamingClient } = require('sarvamai/speechToTextStreaming');
const { TextToSpeechStreamingClient } = require('sarvamai/textToSpeechStreaming');

const { retry } = require('../../utils/retry');

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
                onError(new Error(message.data?.message || 'Sarvam STT stream error.'));
            }
        });

        socket.on('error', onError);
        socket.connect();
        await socket.waitForOpen();

        if (prompt) {
            socket.sendConfigMessage({ type: 'config', prompt });
        }

        return {
            sendAudio(audioBase64) {
                socket.transcribe({
                    audio: audioBase64,
                    sample_rate: sampleRate || 16000,
                    encoding: 'pcm_s16le',
                });
            },
            flush() {
                socket.flush();
            },
            close() {
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
        this.apiKey = config.apiKey;
        this.client = new TextToSpeechStreamingClient({
            apiSubscriptionKey: config.apiKey,
            baseUrl: config.baseUrl,
            maxRetries: 2,
            timeoutInSeconds: 30,
        });
    }

    async createStream({ languageCode, speaker, onAudio, onComplete, onError }) {
        const socket = await retry(
            () => this.client.connect({
                'Api-Subscription-Key': this.apiKey,
                model: 'bulbul:v3',
                send_completion_event: 'true',
            }),
            { label: 'sarvam-tts-connect' }
        );

        socket.on('message', (message) => {
            if (message.type === 'audio') {
                onAudio({
                    audioBase64: message.data.audio,
                    contentType: message.data.content_type,
                    codec: 'linear16',
                    sampleRate: 16000,
                });
                return;
            }

            if (message.type === 'event' && message.data?.event_type === 'final') {
                onComplete();
                return;
            }

            if (message.type === 'error') {
                onError(new Error(message.data?.message || 'Sarvam TTS stream error.'));
            }
        });

        socket.on('error', onError);
        socket.connect();
        await socket.waitForOpen();

        socket.configureConnection({
            type: 'config',
            data: {
                model: 'bulbul:v3',
                target_language_code: languageCode || 'en-IN',
                speaker: speaker || 'aditya',
                speech_sample_rate: 16000,
                output_audio_codec: 'linear16',
                min_buffer_size: 1,
                max_chunk_length: 120,
                enable_preprocessing: true,
            },
        });

        return {
            pushText(text) {
                if (text) {
                    socket.convert(text);
                }
            },
            flush() {
                socket.flush();
            },
            close() {
                socket.close();
            },
        };
    }
}

function createVoiceProviders() {
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
