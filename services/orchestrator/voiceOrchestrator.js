const conversationEngine = require('../conversationEngineService');
const sarvamAI = require('../sarvamAIService');
const textToSpeech = require('../textToSpeechService');

/**
 * Voice Orchestrator
 *
 * Pipeline:
 *   1. Accept transcribed user speech
 *   2. Send it to the conversation engine (context management)
 *   3. Call Sarvam AI to generate a text response
 *   4. Send the response to TTS service
 *   5. Return the generated audio + text response
 */
class VoiceOrchestrator {
    /**
     * Handle a single voice input turn.
     * @param {string} sessionId  — unique session/call identifier
     * @param {string} transcript — transcribed user speech
     * @param {object} [options]
     * @param {string}  [options.systemPrompt]          — custom system prompt for the session
     * @param {string}  [options.target_language_code]   — TTS language (default: en-IN)
     * @param {string}  [options.speaker]                — TTS voice
     * @returns {Promise<{textResponse: string, audioBase64: string}>}
     */
    async handleVoiceInput(sessionId, transcript, options = {}) {
        const startTime = Date.now();
        console.log(`[VoiceOrchestrator] Processing input for session: ${sessionId}`);

        try {
            // 1. Ensure session exists and add the user's transcript
            conversationEngine.getOrCreateSession(sessionId, options.systemPrompt);
            conversationEngine.addMessage(sessionId, 'user', transcript);

            // 2. Get full conversation history for context
            const history = conversationEngine.getHistory(sessionId);

            // 3. Call Sarvam AI to generate a text response
            const textResponse = await sarvamAI.generateResponse(history);

            // 4. Store the assistant response in conversation history
            conversationEngine.addMessage(sessionId, 'assistant', textResponse);

            // 5. Convert the text response to speech
            const audioBase64 = await textToSpeech.synthesizeSpeech(textResponse, {
                target_language_code: options.target_language_code,
                speaker: options.speaker
            });

            const elapsed = Date.now() - startTime;
            console.log(`[VoiceOrchestrator] Turn completed in ${elapsed}ms`);

            return {
                textResponse,
                audioBase64
            };
        } catch (error) {
            console.error(`[VoiceOrchestrator] Error: ${error.message}`);
            throw error;
        }
    }

    /**
     * End a voice session and clear its conversation history.
     * @param {string} sessionId
     * @returns {{ cleared: boolean }}
     */
    endSession(sessionId) {
        console.log(`[VoiceOrchestrator] Ending session: ${sessionId}`);
        const cleared = conversationEngine.clearSession(sessionId);
        return { cleared };
    }
}

module.exports = new VoiceOrchestrator();
