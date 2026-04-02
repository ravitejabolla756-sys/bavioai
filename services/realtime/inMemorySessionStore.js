const { randomUUID } = require('crypto');

const sessions = new Map();
const transcripts = new Map();
const connections = new Map();
const callMappings = new Map();
const callMetadata = new Map();

function callKey(provider, callSid) {
    return `${provider}:${callSid}`;
}

class InMemorySessionStore {
    async create({ businessId, assistantId, systemPrompt, welcomeMessage, voice, metadata }) {
        const now = new Date().toISOString();
        const session = {
            id: randomUUID(),
            business_id: businessId,
            assistant_id: assistantId,
            status: 'created',
            transport: {
                websocket_connected: false,
            },
            assistant: {
                system_prompt: systemPrompt,
                welcome_message: welcomeMessage,
                voice: voice || 'aditya',
            },
            transcript: [],
            metadata: metadata || {},
            created_at: now,
            updated_at: now,
            last_input_at: null,
            last_output_at: null,
        };

        sessions.set(session.id, session);
        transcripts.set(session.id, []);
        connections.set(session.id, new Map());

        return session;
    }

    async get(sessionId) {
        const session = sessions.get(sessionId);
        if (!session) return null;

        return {
            ...session,
            transcript: [...(transcripts.get(sessionId) || [])],
            connection_metadata: Array.from((connections.get(sessionId) || new Map()).values()),
        };
    }

    async update(sessionId, patch) {
        const session = sessions.get(sessionId);
        if (!session) return null;

        const next = {
            ...session,
            ...patch,
            updated_at: new Date().toISOString(),
        };
        sessions.set(sessionId, next);
        return next;
    }

    async appendTranscript(sessionId, entry) {
        const transcriptEntry = {
            id: randomUUID(),
            timestamp: new Date().toISOString(),
            ...entry,
        };
        const current = transcripts.get(sessionId) || [];
        current.push(transcriptEntry);
        transcripts.set(sessionId, current);
        return transcriptEntry;
    }

    async markSocketConnected(sessionId, connected) {
        return this.update(sessionId, {
            transport: { websocket_connected: connected },
            status: connected ? 'streaming' : 'created',
        });
    }

    async addConnectionMetadata(sessionId, connectionId, metadata) {
        if (!connections.has(sessionId)) {
            connections.set(sessionId, new Map());
        }
        connections.get(sessionId).set(connectionId, metadata);
    }

    async removeConnectionMetadata(sessionId, connectionId) {
        connections.get(sessionId)?.delete(connectionId);
    }

    async createCallMapping(provider, callSid, sessionId, metadata = {}) {
        callMappings.set(callKey(provider, callSid), sessionId);
        callMetadata.set(callKey(provider, callSid), metadata);
    }

    async getSessionIdByCall(provider, callSid) {
        return callMappings.get(callKey(provider, callSid)) || null;
    }

    async storeCallMetadata(provider, callSid, metadata) {
        callMetadata.set(callKey(provider, callSid), metadata);
    }

    async getCallMetadata(provider, callSid) {
        return callMetadata.get(callKey(provider, callSid)) || null;
    }

    async deleteSession(sessionId) {
        sessions.delete(sessionId);
        transcripts.delete(sessionId);
        connections.delete(sessionId);
    }
}

module.exports = new InMemorySessionStore();
