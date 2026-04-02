const sessionStore = require('./sessionStore');
const { INTERNAL_SAMPLE_RATE, normalizeInputAudio, detectVoiceActivity } = require('../audio/audioProcessing');

class VoicePipeline {
    constructor({ sessionId, providers, emitEvent }) {
        this.sessionId = sessionId;
        this.providers = providers;
        this.emitEvent = emitEvent;
        this.sttStream = null;
        this.ttsStream = null;
        this.llmAbortController = null;
        this.partialFlushInterval = null;
        this.pendingTranscriptKinds = [];
        this.partialSegments = [];
        this.ttsTokenBuffer = '';
        this.assistantStreaming = false;
        this.inputSpeechActive = false;
        this.awaitingFinalTranscript = false;
        this.stopped = false;
        this.ready = this.initialize();
    }

    async initialize() {
        const session = await sessionStore.get(this.sessionId);
        if (!session) {
            throw new Error('Realtime session not found.');
        }

        this.sttStream = await this.providers.stt.createStream({
            languageCode: session.metadata.language_code || 'en-IN',
            sampleRate: INTERNAL_SAMPLE_RATE,
            prompt: session.assistant.system_prompt,
            onTranscript: (data) => {
                this.handleTranscript(data).catch((error) => {
                    console.error('[voicePipeline.handleTranscript]', error);
                    this.emitEvent('error', { session_id: this.sessionId, error: error.message });
                });
            },
            onEvent: (event) => {
                this.handleVadEvent(event).catch((error) => {
                    console.error('[voicePipeline.handleVadEvent]', error);
                    this.emitEvent('error', { session_id: this.sessionId, error: error.message });
                });
            },
            onError: (error) => {
                console.error('[voicePipeline.stt]', error);
                this.emitEvent('error', { session_id: this.sessionId, error: error.message });
            },
        });
    }

    async ingestAudioFrame(frame) {
        await this.ready;

        const normalized = normalizeInputAudio({
            audioBase64: frame.audioBase64,
            codec: frame.codec,
            sampleRate: frame.sampleRate,
        });

        const voiceDetected = detectVoiceActivity(normalized.pcmBuffer);
        if (voiceDetected && !this.inputSpeechActive) {
            this.inputSpeechActive = true;
            this.emitEvent('vad.local.start', { session_id: this.sessionId });
            if (this.assistantStreaming) {
                await this.interruptAssistant('barge-in');
            }
            this.startPartialFlushLoop();
        }

        if (!voiceDetected && this.inputSpeechActive) {
            this.inputSpeechActive = false;
            this.emitEvent('vad.local.end', { session_id: this.sessionId });
        }

        const audioBuffer = Buffer.from(normalized.audioBase64, 'base64');
        const chunkSize = 3200;
        for (let offset = 0; offset < audioBuffer.length; offset += chunkSize) {
            const chunk = audioBuffer.subarray(offset, Math.min(offset + chunkSize, audioBuffer.length));
            this.sttStream.sendAudio(chunk.toString('base64'));
        }
        await sessionStore.update(this.sessionId, {
            last_input_at: new Date().toISOString(),
        });
    }

    async flushInput(reason = 'final') {
        await this.ready;
        if (reason === 'final' && this.awaitingFinalTranscript) {
            return;
        }
        if (reason === 'final') {
            this.awaitingFinalTranscript = true;
        }
        this.pendingTranscriptKinds.push(reason);
        this.sttStream.flush();
    }

    async handleVadEvent(event) {
        const signal = event.signal_type;
        if (signal === 'START_SPEECH') {
            this.emitEvent('vad.remote.start', { session_id: this.sessionId });
            if (this.assistantStreaming) {
                await this.interruptAssistant('remote-barge-in');
            }
            this.startPartialFlushLoop();
            return;
        }

        if (signal === 'END_SPEECH') {
            this.emitEvent('vad.remote.end', { session_id: this.sessionId });
            await this.flushInput('final');
        }
    }

    async handleTranscript(data) {
        const transcript = (data.transcript || '').trim();
        if (!transcript) {
            return;
        }

        const transcriptKind = this.pendingTranscriptKinds.shift() || 'partial';
        const utteranceSoFar = [...this.partialSegments, transcript].join(' ').trim();

        if (transcriptKind === 'partial') {
            this.partialSegments.push(transcript);
            this.emitEvent('transcript.partial', {
                session_id: this.sessionId,
                transcript: utteranceSoFar,
            });
            return;
        }

        this.awaitingFinalTranscript = false;
        this.stopPartialFlushLoop();
        const finalText = utteranceSoFar;
        this.partialSegments = [];

        const userMessage = await sessionStore.appendTranscript(this.sessionId, {
            role: 'user',
            content: finalText,
            metadata: {
                provider: 'sarvam-stt',
                request_id: data.request_id,
                metrics: data.metrics,
            },
        });

        this.emitEvent('transcript.final', {
            session_id: this.sessionId,
            transcript: userMessage,
        });

        await this.generateAssistantResponse();
    }

    async generateAssistantResponse() {
        await this.interruptAssistant('restart-assistant');

        const session = await sessionStore.get(this.sessionId);
        if (!session) {
            return;
        }

        this.assistantStreaming = true;
        this.ttsTokenBuffer = '';
        this.llmAbortController = new AbortController();
        const llmMessages = this.buildLlmMessages(session);

        this.ttsStream = await this.providers.tts.createStream({
            languageCode: session.metadata.language_code || 'en-IN',
            speaker: session.assistant.voice || 'aditya',
            onAudio: (audioChunk) => {
                this.emitEvent('audio.output', {
                    session_id: this.sessionId,
                    audio: audioChunk,
                });
            },
            onComplete: () => {
                this.emitEvent('audio.output.complete', { session_id: this.sessionId });
            },
            onError: (error) => {
                console.error('[voicePipeline.tts]', error);
                this.emitEvent('error', { session_id: this.sessionId, error: error.message });
            },
        });

        try {
            const llmResult = await this.providers.llm.streamResponse({
                messages: llmMessages,
                abortSignal: this.llmAbortController.signal,
                onToken: async (token) => {
                    this.emitEvent('assistant.partial', {
                        session_id: this.sessionId,
                        token,
                    });

                    this.ttsTokenBuffer += token;
                    if (/[.?!,]\s$/.test(this.ttsTokenBuffer) || this.ttsTokenBuffer.length >= 32) {
                        this.ttsStream.pushText(this.ttsTokenBuffer);
                        this.ttsTokenBuffer = '';
                    }
                },
            });

            if (this.ttsTokenBuffer) {
                this.ttsStream.pushText(this.ttsTokenBuffer);
                this.ttsTokenBuffer = '';
            }
            this.ttsStream.flush();

            const assistantMessage = await sessionStore.appendTranscript(this.sessionId, {
                role: 'assistant',
                content: llmResult.text,
                metadata: {
                    provider: 'sarvam-llm',
                },
            });

            this.emitEvent('assistant.final', {
                session_id: this.sessionId,
                message: assistantMessage,
            });

            await sessionStore.update(this.sessionId, {
                last_output_at: new Date().toISOString(),
                status: 'streaming',
            });
        } catch (error) {
            if (error.name === 'AbortError' || /abort/i.test(error.message)) {
                return;
            }
            throw error;
        } finally {
            this.assistantStreaming = false;
        }
    }

    buildLlmMessages(session) {
        const conversation = [];

        for (const entry of session.transcript) {
            if (entry.role !== 'user' && entry.role !== 'assistant') {
                continue;
            }

            if (conversation.length === 0 && entry.role !== 'user') {
                continue;
            }

            const previous = conversation[conversation.length - 1];
            if (previous?.role === entry.role) {
                previous.content = `${previous.content}\n${entry.content}`;
                continue;
            }

            conversation.push({
                role: entry.role,
                content: entry.content,
            });
        }

        if (conversation.length === 0) {
            return [{
                role: 'user',
                content: `${session.assistant.system_prompt}\n\nRespond briefly and helpfully.`,
            }];
        }

        conversation[0] = {
            role: 'user',
            content: `${session.assistant.system_prompt}\n\nConversation start:\n${conversation[0].content}`,
        };

        return conversation;
    }

    async speakAssistantText(text, metadata = {}) {
        await this.ready;

        const session = await sessionStore.get(this.sessionId);
        if (!session || !text || !text.trim()) {
            return;
        }

        await this.interruptAssistant('speak-text');

        this.assistantStreaming = true;
        this.ttsStream = await this.providers.tts.createStream({
            languageCode: session.metadata.language_code || 'en-IN',
            speaker: session.assistant.voice || 'aditya',
            onAudio: (audioChunk) => {
                this.emitEvent('audio.output', {
                    session_id: this.sessionId,
                    audio: audioChunk,
                });
            },
            onComplete: () => {
                this.emitEvent('audio.output.complete', { session_id: this.sessionId });
            },
            onError: (error) => {
                console.error('[voicePipeline.tts.speak]', error);
                this.emitEvent('error', { session_id: this.sessionId, error: error.message });
            },
        });

        try {
            this.ttsStream.pushText(text.trim());
            this.ttsStream.flush();

            const assistantMessage = await sessionStore.appendTranscript(this.sessionId, {
                role: 'assistant',
                content: text.trim(),
                metadata: {
                    provider: 'sarvam-tts',
                    kind: 'greeting',
                    ...metadata,
                },
            });

            this.emitEvent('assistant.final', {
                session_id: this.sessionId,
                message: assistantMessage,
            });
        } finally {
            this.assistantStreaming = false;
        }
    }

    async interruptAssistant(reason) {
        if (!this.assistantStreaming && !this.llmAbortController && !this.ttsStream) {
            return;
        }

        if (this.llmAbortController) {
            this.llmAbortController.abort();
            this.llmAbortController = null;
        }

        if (this.ttsStream) {
            this.ttsStream.close();
            this.ttsStream = null;
        }

        this.ttsTokenBuffer = '';
        this.assistantStreaming = false;

        this.emitEvent('assistant.interrupted', {
            session_id: this.sessionId,
            reason,
        });
    }

    startPartialFlushLoop() {
        if (this.partialFlushInterval) {
            return;
        }

        this.partialFlushInterval = setInterval(() => {
            if (!this.inputSpeechActive || !this.sttStream || this.stopped) {
                return;
            }

            this.pendingTranscriptKinds.push('partial');
            this.sttStream.flush();
        }, 700);
    }

    stopPartialFlushLoop() {
        if (this.partialFlushInterval) {
            clearInterval(this.partialFlushInterval);
            this.partialFlushInterval = null;
        }
    }

    async close(reason = 'session-closed') {
        this.stopped = true;
        this.stopPartialFlushLoop();
        await this.interruptAssistant(reason);

        if (this.sttStream) {
            this.sttStream.close();
            this.sttStream = null;
        }
    }
}

module.exports = VoicePipeline;
