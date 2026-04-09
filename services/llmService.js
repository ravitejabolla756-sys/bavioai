const axios = require('axios');

const { buildPrompt } = require('../utils/promptBuilder');

const LLM_URL = 'https://api.sarvam.ai/v1/chat/completions';

function extractLeadData(text) {
    if (!text || !text.includes('[LEAD_CAPTURED]')) {
        return null;
    }

    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');

    if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
        return null;
    }

    try {
        const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
        return {
            name: parsed.name || null,
            phone: parsed.phone || null,
            email: parsed.email || null,
            intent: parsed.intent || null,
            budget: parsed.budget || null,
            location: parsed.location || null,
            notes: parsed.notes || null,
        };
    } catch (error) {
        console.error('[LLM] extractLeadData:', error.message);
        return null;
    }
}

async function generateResponse(messages, systemPrompt, industry = 'real_estate') {
    try {
        const response = await axios.post(
            LLM_URL,
            {
                model: 'sarvam-m',
                messages: [
                    {
                        role: 'system',
                        content: `${systemPrompt} Industry: ${industry}.`,
                    },
                    ...messages,
                ],
                temperature: 0.3,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.SARVAM_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                timeout: 45000,
            }
        );

        const responseText = response.data?.choices?.[0]?.message?.content
            || response.data?.response
            || '';

        return {
            response_text: String(responseText).trim(),
            lead_data: extractLeadData(String(responseText)),
        };
    } catch (error) {
        console.error('[LLM] generateResponse:', error.message);
        throw error;
    }
}

function buildSystemPrompt(assistant, business) {
    return buildPrompt({ assistant, business });
}

module.exports = {
    generateResponse,
    extractLeadData,
    buildSystemPrompt,
};
