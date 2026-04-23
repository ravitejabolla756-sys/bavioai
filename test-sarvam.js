require('dotenv').config();

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const AUDIO_FILE_PATH = fs.existsSync(path.join(__dirname, '.m4a'))
  ? path.join(__dirname, '.m4a')
  : path.join(__dirname, '.m4a.mp3');

function getApiKey() {
  const apiKey = process.env.SARVAM_API_KEY;

  if (!apiKey) {
    throw new Error('Missing SARVAM_API_KEY in .env. Add SARVAM_API_KEY=your_key_here before running this test.');
  }

  console.log(`Loaded SARVAM_API_KEY: ${apiKey.slice(0, 10)}...`);
  return apiKey;
}

function ensureAudioFile() {
  if (!fs.existsSync(AUDIO_FILE_PATH)) {
    throw new Error(`Audio file not found: ${AUDIO_FILE_PATH}`);
  }

  const stats = fs.statSync(AUDIO_FILE_PATH);
  if (!stats.size) {
    throw new Error(`Audio file is empty: ${AUDIO_FILE_PATH}`);
  }

  return AUDIO_FILE_PATH;
}

async function testSTT() {
  try {
    console.log('Testing Sarvam STT...');

    const apiKey = getApiKey();
    const audioFilePath = ensureAudioFile();

    const form = new FormData();
    form.append('file', fs.createReadStream(audioFilePath));
    form.append('model', 'saarika:v2.5');
    form.append('language_code', 'en-IN');

    const response = await axios.post(
      'https://api.sarvam.ai/speech-to-text',
      form,
      {
        headers: {
          ...form.getHeaders(),
          'api-subscription-key': apiKey
        },
        timeout: 30000
      }
    );

    console.log('STT Result:', response.data?.transcript || response.data);
  } catch (error) {
    if (error.response) {
      console.error('Sarvam API request failed:', error.response.status, error.response.data);
      return;
    }

    console.error('Sarvam STT test failed:', error.message);
  }
}

testSTT();
