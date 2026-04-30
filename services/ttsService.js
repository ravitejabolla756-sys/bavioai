const axios = require('axios');

const TTS_URL = 'https://api.sarvam.ai/text-to-speech';

function chunkText(text, maxLength = 500) {
    if (!text || text.length <= maxLength) {
        return [text];
    }

    const chunks = [];
    let remaining = text.trim();

    while (remaining.length > maxLength) {
        let sliceIndex = remaining.lastIndexOf(' ', maxLength);
        if (sliceIndex <= 0) {
            sliceIndex = maxLength;
        }
        chunks.push(remaining.slice(0, sliceIndex).trim());
        remaining = remaining.slice(sliceIndex).trim();
    }

    if (remaining) {
        chunks.push(remaining);
    }

    return chunks;
}

async function synthesizeSpeech(text, language = 'hi-IN', voice = 'meera') {
    try {
        const chunks = chunkText(text);
        const buffers = [];

        for (const chunk of chunks) {
            const response = await axios.post(
                TTS_URL,
                {
                    inputs: [chunk],
                    target_language_code: language,
                    speaker: voice,
                    model: 'bulbul:v2',
                },
                {
                    headers: {
                        'api-subscription-key': process.env.SARVAM_API_KEY,
                        'Content-Type': 'application/json',
                    },
                    timeout: 30000,
                }
            );

            const audioBase64 = response.data?.audios?.[0]
                || response.data?.audio
                || response.data?.outputs?.[0]
                || '';

            buffers.push(Buffer.from(audioBase64, 'base64'));
        }

        return Buffer.concat(buffers).toString('base64');
    } catch (error) {
        console.error('[TTS] synthesizeSpeech:', error.message);
        throw error;
    }
}

module.exports = { synthesizeSpeech };
