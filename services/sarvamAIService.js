const axios = require('axios');

const SARVAM_API_BASE = 'https://api.sarvam.ai';
const DEFAULT_MODEL = 'sarvam-m';

/**
 * Service for generating AI text responses via Sarvam AI chat completions.
 */
class SarvamAIService {
    constructor() {
        this.apiKey = process.env.SARVAM_API_KEY;
    }

    /**
     * Generate a conversational response from Sarvam AI.
     * @param {Array<{role: string, content: string}>} messages — full conversation history
     * @param {object} [options]
     * @param {string}  [options.model]       — model id (default: sarvam-m)
     * @param {number}  [options.temperature] — sampling temperature (default: 0.2)
     * @param {number}  [options.max_tokens]  — max tokens in response
     * @returns {Promise<string>} the assistant's text reply
     */
    async generateResponse(messages, options = {}) {
        if (!this.apiKey) {
            throw new Error('[SarvamAI] SARVAM_API_KEY is not set in environment variables');
        }

        const {
            model = DEFAULT_MODEL,
            temperature = 0.2,
            max_tokens = 512
        } = options;

        try {
            console.log(`[SarvamAI] Generating response (${messages.length} messages, model: ${model})`);

            const response = await axios.post(
                `${SARVAM_API_BASE}/chat/completions`,
                {
                    model,
                    messages,
                    temperature,
                    max_tokens
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'api-subscription-key': this.apiKey
                    }
                }
            );

            const reply = response.data.choices?.[0]?.message?.content;

            if (!reply) {
                throw new Error('No content in Sarvam AI response');
            }

            console.log(`[SarvamAI] Response generated (${reply.length} chars)`);
            return reply;
        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            console.error(`[SarvamAI] Error generating response: ${msg}`);
            throw new Error(`Sarvam AI generation failed: ${msg}`);
        }
    }
}

module.exports = new SarvamAIService();
