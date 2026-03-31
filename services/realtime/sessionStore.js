const { randomUUID } = require('crypto');

const { getRedisClient } = require('../redisClient');

const SESSION_TTL_SECONDS = parseInt(process.env.REALTIME_SESSION_TTL_SECONDS || '3600', 10);

function sessionKey(sessionId) {
    return `realtime:session:${sessionId}`;
}

function transcriptKey(sessionId) {
    return `realtime:session:${sessionId}:transcript`;
}

function connectionKey(sessionId) {
    return `realtime:session:${sessionId}:connections`;
}

function callMapKey(provider, callSid) {
    return `realtime:call-map:${provider}:${callSid}`;
}

function callMetadataKey(provider, callSid) {
    return `realtime:call-metadata:${provider}:${callSid}`;
}

async function withExpiry(client, key) {
    await client.expire(key, SESSION_TTL_SECONDS);
}

async function atomicUpdate(sessionId, mutator) {
    const client = await getRedisClient();
    const key = sessionKey(sessionId);

    for (let attempt = 0; attempt < 5; attempt += 1) {
        await client.watch(key);
        const currentPayload = await client.get(key);

        if (!currentPayload) {
            await client.unwatch();
            return null;
        }

        const current = JSON.parse(currentPayload);
        const next = mutator(current);
        next.updated_at = new Date().toISOString();

        const result = await client
            .multi()
            .set(key, JSON.stringify(next), { EX: SESSION_TTL_SECONDS })
            .exec();

        if (result) {
            return next;
        }
    }

    throw new Error(`Concurrent session update failed for ${sessionId}`);
}

class RealtimeSessionStore {
    async create({ businessId, assistantId, systemPrompt, welcomeMessage, voice, metadata }) {
        const client = await getRedisClient();
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

        await client.set(sessionKey(session.id), JSON.stringify(session), { EX: SESSION_TTL_SECONDS });
        await withExpiry(client, transcriptKey(session.id));
        await withExpiry(client, connectionKey(session.id));

        return session;
    }

    async get(sessionId) {
        const client = await getRedisClient();
        const sessionPayload = await client.get(sessionKey(sessionId));
        if (!sessionPayload) return null;

        const session = JSON.parse(sessionPayload);
        const transcriptItems = await client.lRange(transcriptKey(sessionId), 0, -1);
        const connections = await client.hGetAll(connectionKey(sessionId));

        session.transcript = transcriptItems.map((item) => JSON.parse(item));
        session.connection_metadata = Object.values(connections).map((value) => JSON.parse(value));
        return session;
    }

    async update(sessionId, patch) {
        return atomicUpdate(sessionId, (current) => ({
            ...current,
            ...patch,
        }));
    }

    async appendTranscript(sessionId, entry) {
        const client = await getRedisClient();
        const transcriptEntry = {
            id: randomUUID(),
            timestamp: new Date().toISOString(),
            ...entry,
        };

        await client.rPush(transcriptKey(sessionId), JSON.stringify(transcriptEntry));
        await withExpiry(client, transcriptKey(sessionId));
        await atomicUpdate(sessionId, (current) => current);

        return transcriptEntry;
    }

    async markSocketConnected(sessionId, connected) {
        return atomicUpdate(sessionId, (current) => ({
            ...current,
            transport: {
                ...current.transport,
                websocket_connected: connected,
            },
            status: connected ? 'streaming' : 'created',
        }));
    }

    async addConnectionMetadata(sessionId, connectionId, metadata) {
        const client = await getRedisClient();
        await client.hSet(connectionKey(sessionId), connectionId, JSON.stringify(metadata));
        await withExpiry(client, connectionKey(sessionId));
    }

    async removeConnectionMetadata(sessionId, connectionId) {
        const client = await getRedisClient();
        await client.hDel(connectionKey(sessionId), connectionId);
        await withExpiry(client, connectionKey(sessionId));
    }

    async createCallMapping(provider, callSid, sessionId, metadata = {}) {
        const client = await getRedisClient();
        await client.set(callMapKey(provider, callSid), sessionId, { EX: SESSION_TTL_SECONDS });
        await client.set(callMetadataKey(provider, callSid), JSON.stringify(metadata), { EX: SESSION_TTL_SECONDS });
    }

    async getSessionIdByCall(provider, callSid) {
        const client = await getRedisClient();
        return client.get(callMapKey(provider, callSid));
    }

    async storeCallMetadata(provider, callSid, metadata) {
        const client = await getRedisClient();
        await client.set(callMetadataKey(provider, callSid), JSON.stringify(metadata), { EX: SESSION_TTL_SECONDS });
    }

    async getCallMetadata(provider, callSid) {
        const client = await getRedisClient();
        const payload = await client.get(callMetadataKey(provider, callSid));
        return payload ? JSON.parse(payload) : null;
    }

    async deleteSession(sessionId) {
        const client = await getRedisClient();
        await client.del(sessionKey(sessionId), transcriptKey(sessionId), connectionKey(sessionId));
    }
}

module.exports = new RealtimeSessionStore();
