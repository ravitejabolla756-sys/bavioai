const { createClient } = require('redis');

let redisClient = null;
let connectionPromise = null;
let hasLoggedRedisUrl = false;

function getRedisUrl() {
    const redisUrl = process.env.REDIS_URL;

    if (!redisUrl) {
        throw new Error('REDIS_URL is required for Redis connectivity.');
    }

    if (!hasLoggedRedisUrl) {
        console.log('[REDIS URL]', redisUrl);
        hasLoggedRedisUrl = true;
    }

    return redisUrl;
}

function buildRedisClient() {
    const client = createClient({
        url: getRedisUrl(),
        socket: {
            tls: false,
            reconnectStrategy(retries) {
                const delay = Math.min(retries * 200, 2000);
                console.warn(`[redis] reconnect attempt ${retries}, retrying in ${delay}ms`);
                return delay;
            },
        },
    });

    client.on('connect', () => {
        console.log('[redis] connecting');
    });

    client.on('ready', () => {
        console.log('[redis] ready');
    });

    client.on('reconnecting', () => {
        console.warn('[redis] reconnecting');
    });

    client.on('end', () => {
        connectionPromise = null;
        console.warn('[redis] connection closed');
    });

    client.on('error', (error) => {
        console.error('[redis] error:', error.message);
    });

    return client;
}

async function getRedisClient() {
    if (redisClient?.isReady) {
        return redisClient;
    }

    if (!redisClient) {
        redisClient = buildRedisClient();
    }

    if (!connectionPromise) {
        connectionPromise = redisClient.connect()
            .then(() => redisClient)
            .catch((error) => {
                console.error('[redis] initial connection failed:', error.message);
                connectionPromise = null;
                redisClient = null;
                throw error;
            });
    }

    await connectionPromise;
    return redisClient;
}

async function initRedis() {
    try {
        const client = await getRedisClient();
        console.log('[REDIS] Connected');
        return client;
    } catch (error) {
        console.error('[REDIS] Failed to connect:', error.message);
        throw error;
    }
}

module.exports = { getRedisClient, initRedis };
