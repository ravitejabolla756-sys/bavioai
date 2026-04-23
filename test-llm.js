require('dotenv').config();

const axios = require('axios');

const LLM_URL = 'https://api.sarvam.ai/v1/chat/completions';
const LLM_PAYLOAD = {
  model: 'sarvam-m',
  messages: [
    {
      role: 'system',
      content: 'You are Bavio AI, a helpful Indian business assistant. You help customers book appointments and answer queries. Reply in under 2 sentences.'
    },
    {
      role: 'user',
      content: 'Hello, I want to book an appointment for tomorrow 5pm'
    }
  ]
};

function getApiKey() {
  const apiKey = process.env.SARVAM_API_KEY;

  if (!apiKey) {
    throw new Error('Missing SARVAM_API_KEY in .env. Add SARVAM_API_KEY=your_key_here before running this test.');
  }

  return apiKey;
}

async function testLLM() {
  try {
    const apiKey = getApiKey();

    const response = await axios.post(LLM_URL, LLM_PAYLOAD, {
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': apiKey
      },
      timeout: 30000
    });

    const aiResponse = response.data?.choices?.[0]?.message?.content;

    if (!aiResponse) {
      console.error('Sarvam LLM returned an unexpected response:', response.data);
      return;
    }

    console.log('AI Response:');
    console.log(aiResponse);
  } catch (error) {
    if (error.response) {
      console.error('Sarvam LLM API request failed:', error.response.status, error.response.data);
      return;
    }

    if (error.request) {
      console.error('Sarvam LLM request failed: no response received from the server.');
      return;
    }

    console.error(`Sarvam LLM test failed: ${error.message}`);
  }
}

testLLM();
