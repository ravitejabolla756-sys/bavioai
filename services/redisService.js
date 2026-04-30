const Redis = require('ioredis');

function buildRedisClient() {
    const redisUrl = process.env.REDIS_URL;
    const parsed = new URL(redisUrl);
    const useTls = parsed.protocol === 'rediss:' || parsed.hostname.endsWith('upstash.io');
    const normalizedUrl = useTls && parsed.protocol === 'redis:'
        ? redisUrl.replace(/^redis:\/\//, 'rediss://')
        : redisUrl;

    return new Redis(normalizedUrl, {
        lazyConnect: true,
        maxRetriesPerRequest: 3,
        tls: useTls ? {} : undefined,
    });
}

const redis = buildRedisClient();

redis.on('error', (error) => {
    console.error('[REDIS] error:', error.message);
});

function sessionKey(callSid) {
    return String(callSid || '').startsWith('call:')
        ? String(callSid)
        : `call:${callSid}`;
}

async function ensureRedisConnection() {
    if (redis.status === 'ready') {
        return redis;
    }

    if (redis.status === 'wait') {
        await redis.connect();
    }

    return redis;
}

async function connectRedis() {
    try {
        await ensureRedisConnection();
        await redis.ping();
        console.log('[REDIS] connection: ok');
        return redis;
    } catch (error) {
        console.error('[REDIS] connection: failed', error.message);
        throw error;
    }
}

async function getSession(callSid) {
    try {
        await ensureRedisConnection();
        const data = await redis.get(sessionKey(callSid));
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('[REDIS] getSession failed:', error.message);
        throw error;
    }
}

async function setSession(callSid, data) {
    try {
        await ensureRedisConnection();
        await redis.set(sessionKey(callSid), JSON.stringify(data), 'EX', 3600);
        return data;
    } catch (error) {
        console.error('[REDIS] setSession failed:', error.message);
        throw error;
    }
}

async function updateSession(callSid, updates) {
    try {
        const existing = (await getSession(callSid)) || {};
        const merged = { ...existing, ...updates };
        await setSession(callSid, merged);
        return merged;
    } catch (error) {
        console.error('[REDIS] updateSession failed:', error.message);
        throw error;
    }
}

async function deleteSession(callSid) {
    try {
        await ensureRedisConnection();
        await redis.del(sessionKey(callSid));
    } catch (error) {
        console.error('[REDIS] deleteSession failed:', error.message);
        throw error;
    }
}

async function sessionExists(callSid) {
    try {
        await ensureRedisConnection();
        const exists = await redis.exists(sessionKey(callSid));
        return exists === 1;
    } catch (error) {
        console.error('[REDIS] sessionExists failed:', error.message);
        throw error;
    }
}

module.exports = {
    redis,
    connectRedis,
    getSession,
    setSession,
    updateSession,
    deleteSession,
    sessionExists,
};
