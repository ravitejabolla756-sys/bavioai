const axios = require('axios');

const { buildPrompt } = require('../utils/promptBuilder');

const LLM_URL = 'https://api.sarvam.ai/v1/chat/completions';

function extractLeadData(text) {
    const marker = '[LEAD_CAPTURED]';
    if (!text.includes(marker)) {
        return null;
    }

    const markerIndex = text.indexOf(marker);
    const afterMarker = text.slice(markerIndex + marker.length);
    const jsonStart = afterMarker.indexOf('{');
    const jsonEnd = afterMarker.lastIndexOf('}');

    if (jsonStart === -1 || jsonEnd === -1 || jsonEnd < jsonStart) {
        return null;
    }

    try {
        const parsed = JSON.parse(afterMarker.slice(jsonStart, jsonEnd + 1));
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
        console.error('[LLM] extractLeadData failed:', error.message);
        return null;
    }
}

function stripMarkers(text) {
    return text
        .replace(/\[LEAD_CAPTURED\][\s\S]*$/m, '')
        .replace(/\[END_CALL\]/g, '')
        .trim();
}

async function generateResponse(messages, systemPrompt, industry = 'general') {
    try {
        const response = await axios.post(
            LLM_URL,
            {
                model: process.env.SARVAM_LLM_MODEL || 'sarvam-m',
                messages: [
                    {
                        role: 'system',
                        content: `${systemPrompt}\nIndustry: ${industry}.`,
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

        const rawText = String(
            response.data?.choices?.[0]?.message?.content
            || response.data?.response
            || ''
        ).trim();
        const leadData = extractLeadData(rawText);
        const shouldEnd = rawText.includes('[END_CALL]');

        return {
            response_text: stripMarkers(rawText),
            lead_data: leadData,
            should_end: shouldEnd,
        };
    } catch (error) {
        console.error('[LLM] generateResponse failed:', error.message);
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
