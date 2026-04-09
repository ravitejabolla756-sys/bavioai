const { transcribeAudio } = require('./sttService');
const { generateResponse, buildSystemPrompt } = require('./llmService');
const { synthesizeSpeech } = require('./ttsService');
const { updateSession } = require('./redisService');

async function processTurn({ callSid, audioBuffer, sessionData, assistantConfig, business }) {
    try {
        const transcriptText = await transcribeAudio(audioBuffer, assistantConfig.language || 'hi-IN');

        const transcript = Array.isArray(sessionData.transcript) ? [...sessionData.transcript] : [];
        transcript.push({ role: 'user', content: transcriptText });

        const messages = transcript.map((item) => ({
            role: item.role === 'assistant' ? 'assistant' : 'user',
            content: item.content,
        }));

        const systemPrompt = buildSystemPrompt(assistantConfig, business);
        const { response_text, lead_data } = await generateResponse(messages, systemPrompt, assistantConfig.industry || 'general');
        const responseAudio = await synthesizeSpeech(response_text, assistantConfig.language || 'hi-IN');

        transcript.push({ role: 'assistant', content: response_text });

        await updateSession(callSid, {
            transcript,
            turn: Number(sessionData.turn || 0) + 1,
        });

        return {
            responseAudio,
            responseText: response_text,
            leadData: lead_data,
            shouldEnd: response_text.includes('[END_CALL]'),
            transcriptText,
        };
    } catch (error) {
        console.error('[ORCHESTRATOR] processTurn:', error.message);
        throw error;
    }
}

module.exports = { processTurn };
