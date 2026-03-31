const { DEFAULT_SYSTEM_PROMPT } = require('../../utils/defaultPrompt');
const sessionStore = require('./sessionStore');

async function createSession({ businessId, assistantId, systemPrompt, welcomeMessage, voice, metadata }) {
    return sessionStore.create({
        businessId,
        assistantId,
        systemPrompt: systemPrompt || DEFAULT_SYSTEM_PROMPT,
        welcomeMessage: welcomeMessage || 'Hello, how can I help you today?',
        voice,
        metadata,
    });
}

async function getSession(sessionId) {
    return sessionStore.get(sessionId);
}

module.exports = { createSession, getSession };
