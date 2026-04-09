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

async function connectRedis() {
    try {
        if (redis.status === 'ready') {
            return redis;
        }

        await redis.connect();
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
        const data = await redis.get(`call:${callSid}`);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('[REDIS] getSession:', error.message);
        throw error;
    }
}

async function setSession(callSid, data) {
    try {
        await redis.set(`call:${callSid}`, JSON.stringify(data), 'EX', 3600);
        return data;
    } catch (error) {
        console.error('[REDIS] setSession:', error.message);
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
        console.error('[REDIS] updateSession:', error.message);
        throw error;
    }
}

async function deleteSession(callSid) {
    try {
        await redis.del(`call:${callSid}`);
    } catch (error) {
        console.error('[REDIS] deleteSession:', error.message);
        throw error;
    }
}

async function sessionExists(callSid) {
    try {
        const exists = await redis.exists(`call:${callSid}`);
        return exists === 1;
    } catch (error) {
        console.error('[REDIS] sessionExists:', error.message);
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
