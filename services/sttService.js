const axios = require('axios');
const FormData = require('form-data');

const STT_URL = 'https://api.sarvam.ai/speech-to-text';

async function transcribeAudio(audioBuffer, language = 'hi-IN') {
    let lastError;

    for (let attempt = 1; attempt <= 3; attempt += 1) {
        try {
            const form = new FormData();
            form.append('file', audioBuffer, {
                filename: 'audio.wav',
                contentType: 'audio/wav',
            });
            form.append('language_code', language);

            const response = await axios.post(STT_URL, form, {
                headers: {
                    ...form.getHeaders(),
                    'api-subscription-key': process.env.SARVAM_API_KEY,
                },
                timeout: 30000,
            });

            const transcript = response.data?.transcript
                || response.data?.text
                || response.data?.results?.transcript
                || '';

            return String(transcript).trim();
        } catch (error) {
            lastError = error;
            console.error('[STT] transcribeAudio:', `attempt ${attempt}`, error.message);
        }
    }

    throw lastError;
}

module.exports = { transcribeAudio };
