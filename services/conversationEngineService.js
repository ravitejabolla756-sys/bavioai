const { DEFAULT_SYSTEM_PROMPT } = require('../utils/defaultPrompt');

/**
 * In-memory conversation context manager.
 * Maintains per-session message history so the AI model
 * receives full conversational context on every turn.
 */
class ConversationEngineService {
    constructor() {
        /** @type {Map<string, Array<{role: string, content: string}>>} */
        this.sessions = new Map();
    }

    /**
     * Return the session history, creating it with a system prompt if new.
     */
    getOrCreateSession(sessionId, systemPrompt) {
        if (!this.sessions.has(sessionId)) {
            const prompt = systemPrompt || DEFAULT_SYSTEM_PROMPT;
            this.sessions.set(sessionId, [
                { role: 'system', content: prompt }
            ]);
            console.log(`[ConversationEngine] New session created: ${sessionId}`);
        }
        return this.sessions.get(sessionId);
    }

    /**
     * Append a message (user or assistant) to the session.
     */
    addMessage(sessionId, role, content) {
        const history = this.getOrCreateSession(sessionId);
        history.push({ role, content });
        return history;
    }

    /**
     * Get the full message history for a session.
     */
    getHistory(sessionId) {
        return this.getOrCreateSession(sessionId);
    }

    /**
     * Remove a session entirely.
     */
    clearSession(sessionId) {
        const existed = this.sessions.delete(sessionId);
        if (existed) {
            console.log(`[ConversationEngine] Session cleared: ${sessionId}`);
        }
        return existed;
    }
}

module.exports = new ConversationEngineService();
