const axios = require('axios');
const FormData = require('form-data');

const STT_URL = 'https://api.sarvam.ai/speech-to-text';

async function wait(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
}

async function transcribeAudio(audioBuffer, language = 'hi-IN') {
    let lastError;

    for (let attempt = 1; attempt <= 3; attempt += 1) {
        try {
            console.log(`[STT] Transcribing ${audioBuffer.length} bytes`);

            const form = new FormData();
            form.append('file', audioBuffer, {
                filename: 'file',
                contentType: 'audio/wav',
            });
            form.append('language_code', language);
            form.append('model', 'saarika:v1');

            const response = await axios.post(STT_URL, form, {
                headers: {
                    ...form.getHeaders(),
                    'api-subscription-key': process.env.SARVAM_API_KEY,
                },
                timeout: 30000,
            });

            const text = String(
                response.data?.transcript
                || response.data?.text
                || response.data?.results?.transcript
                || response.data?.data?.transcript
                || ''
            ).trim();

            console.log(`[STT] Result: "${text.slice(0, 80)}${text.length > 80 ? '...' : ''}"`);

            return {
                text,
                language_code: response.data?.language_code || language,
            };
        } catch (error) {
            lastError = error;
            console.error('[STT] transcribeAudio failed:', error.message);
            if (attempt < 3) {
                await wait(1000);
            }
        }
    }

    throw new Error(`[STT] Failed: ${lastError.message}`);
}

module.exports = { transcribeAudio };
