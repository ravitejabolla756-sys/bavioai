const axios = require('axios');

const SARVAM_API_BASE = 'https://api.sarvam.ai';
const DEFAULT_MODEL = 'bulbul:v3';

/**
 * Service for converting text to speech via Sarvam AI TTS.
 */
class TextToSpeechService {
    constructor() {
        this.apiKey = process.env.SARVAM_API_KEY;
    }

    /**
     * Convert text to speech audio.
     * @param {string} text — the text to synthesize
     * @param {object} [options]
     * @param {string}  [options.target_language_code] — language code (default: en-IN)
     * @param {string}  [options.speaker]              — voice speaker name
     * @param {string}  [options.model]                — TTS model (default: bulbul:v3)
     * @param {number}  [options.pitch]                — pitch adjustment
     * @param {number}  [options.pace]                 — speech pace (0.5–2.0)
     * @param {string}  [options.audio_format]         — output format (wav, mp3, etc.)
     * @returns {Promise<string>} base64-encoded audio data
     */
    async synthesizeSpeech(text, options = {}) {
        if (!this.apiKey) {
            throw new Error('[TTS] SARVAM_API_KEY is not set in environment variables');
        }

        if (!text || text.trim().length === 0) {
            throw new Error('[TTS] Text cannot be empty');
        }

        const {
            target_language_code = 'en-IN',
            speaker,
            model = DEFAULT_MODEL,
            pitch,
            pace,
            audio_format
        } = options;

        // Build request payload — only include optional fields if provided
        const payload = {
            inputs: [text],
            target_language_code,
            model
        };
        if (speaker) payload.speaker = speaker;
        if (pitch !== undefined) payload.pitch = pitch;
        if (pace !== undefined) payload.pace = pace;
        if (audio_format) payload.audio_format = audio_format;

        try {
            console.log(`[TTS] Synthesizing speech (${text.length} chars, lang: ${target_language_code})`);

            const response = await axios.post(
                `${SARVAM_API_BASE}/text-to-speech`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'api-subscription-key': this.apiKey
                    }
                }
            );

            const audioBase64 = response.data.audios?.[0];

            if (!audioBase64) {
                throw new Error('No audio data in Sarvam TTS response');
            }

            console.log(`[TTS] Audio synthesized successfully`);
            return audioBase64;
        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            console.error(`[TTS] Error synthesizing speech: ${msg}`);
            throw new Error(`Sarvam TTS failed: ${msg}`);
        }
    }
}

module.exports = new TextToSpeechService();
