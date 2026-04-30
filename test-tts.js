require('dotenv').config();

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const OUTPUT_FILE_PATH = path.join(__dirname, 'output-tts.wav');
const TTS_URL = 'https://api.sarvam.ai/text-to-speech';
const TTS_PAYLOAD = {
  text: 'Namaste! Main Bavio AI hoon. Aapki appointment book kar deta hoon.',
  model: 'bulbul:v2',
  voice: 'meera',
  target_language_code: 'hi-IN'
};

function getApiKey() {
  const apiKey = process.env.SARVAM_API_KEY;

  if (!apiKey) {
    throw new Error('Missing SARVAM_API_KEY in .env. Add SARVAM_API_KEY=your_key_here before running this test.');
  }

  return apiKey;
}

async function testTTS() {
  try {
    const apiKey = getApiKey();

    const response = await axios.post(TTS_URL, TTS_PAYLOAD, {
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': apiKey
      },
      responseType: 'arraybuffer',
      timeout: 30000
    });

    const audioBuffer = Buffer.from(response.data);

    if (!audioBuffer.length) {
      throw new Error('Sarvam TTS returned an empty audio response.');
    }

    fs.writeFileSync(OUTPUT_FILE_PATH, audioBuffer);
    console.log('✅ TTS Success - audio saved to output-tts.wav');
  } catch (error) {
    if (error.response) {
      const errorBody = Buffer.isBuffer(error.response.data)
        ? error.response.data.toString('utf8')
        : JSON.stringify(error.response.data);

      console.error(`Sarvam TTS API request failed: ${error.response.status} ${errorBody}`);
      return;
    }

    if (error.request) {
      console.error('Sarvam TTS request failed: no response received from the server.');
      return;
    }

    console.error(`Sarvam TTS test failed: ${error.message}`);
  }
}

testTTS();
