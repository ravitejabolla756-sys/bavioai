require('dotenv').config();

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const AUDIO_FILE_PATH = path.join(__dirname, '.m4a.mp3');
const OUTPUT_FILE_PATH = path.join(__dirname, 'pipeline-output.wav');
const STT_URL = 'https://api.sarvam.ai/speech-to-text';
const LLM_URL = 'https://api.sarvam.ai/v1/chat/completions';
const TTS_URL = 'https://api.sarvam.ai/text-to-speech';

function getApiKey() {
  const apiKey = process.env.SARVAM_API_KEY;

  if (!apiKey) {
    throw new Error('Missing SARVAM_API_KEY in .env. Add SARVAM_API_KEY=your_key_here before running this test.');
  }

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

function getErrorMessage(error) {
  if (error.response) {
    const responseData = Buffer.isBuffer(error.response.data)
      ? error.response.data.toString('utf8')
      : JSON.stringify(error.response.data);

    return `${error.response.status} ${responseData}`;
  }

  if (error.request) {
    return 'no response received from the server.';
  }

  return error.message;
}

async function runSTT(apiKey, audioFilePath) {
  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(audioFilePath));
    form.append('model', 'saarika:v2.5');
    form.append('language_code', 'en-IN');

    const response = await axios.post(STT_URL, form, {
      headers: {
        ...form.getHeaders(),
        'api-subscription-key': apiKey
      },
      timeout: 30000
    });

    const transcript = response.data?.transcript;

    if (!transcript) {
      throw new Error(`Sarvam STT returned an unexpected response: ${JSON.stringify(response.data)}`);
    }

    console.log('🎙️ STT Result: ' + transcript);
    return transcript;
  } catch (error) {
    throw new Error(`STT step failed: ${getErrorMessage(error)}`);
  }
}

async function runLLM(apiKey, transcript) {
  try {
    const response = await axios.post(
      LLM_URL,
      {
        model: 'sarvam-m',
        messages: [
          {
            role: 'system',
            content: 'You are Bavio AI assistant for Indian businesses. Help customers book appointments. Reply in 1-2 sentences.'
          },
          {
            role: 'user',
            content: transcript
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-subscription-key': apiKey
        },
        timeout: 30000
      }
    );

    const aiResponse = response.data?.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error(`Sarvam LLM returned an unexpected response: ${JSON.stringify(response.data)}`);
    }

    console.log('🧠 LLM Response: ' + aiResponse);
    return aiResponse;
  } catch (error) {
    throw new Error(`LLM step failed: ${getErrorMessage(error)}`);
  }
}

async function runTTS(apiKey, text) {
  try {
    const response = await axios.post(
      TTS_URL,
      {
        text,
        model: 'bulbul:v2',
        voice: 'meera',
        target_language_code: 'hi-IN'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-subscription-key': apiKey
        },
        responseType: 'arraybuffer',
        timeout: 30000
      }
    );

    const audioBuffer = Buffer.from(response.data);

    if (!audioBuffer.length) {
      throw new Error('Sarvam TTS returned an empty audio response.');
    }

    fs.writeFileSync(OUTPUT_FILE_PATH, audioBuffer);
  } catch (error) {
    throw new Error(`TTS step failed: ${getErrorMessage(error)}`);
  }
}

async function runPipeline() {
  try {
    const apiKey = getApiKey();
    const audioFilePath = ensureAudioFile();
    const transcript = await runSTT(apiKey, audioFilePath);
    const aiResponse = await runLLM(apiKey, transcript);
    await runTTS(apiKey, aiResponse);

    console.log('✅ Full pipeline complete! Audio saved.');
  } catch (error) {
    console.error(`Pipeline failed: ${error.message}`);
  }
}

runPipeline();
