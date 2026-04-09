const { createClient } = require('redis');

let redisClient;
let connectionPromise;

function buildRedisOptions(redisUrl) {
    const parsedUrl = new URL(redisUrl);
    const useTls = parsedUrl.protocol === 'rediss:' || parsedUrl.hostname.endsWith('upstash.io');
    const normalizedUrl = useTls && parsedUrl.protocol === 'redis:'
        ? redisUrl.replace(/^redis:\/\//i, 'rediss://')
        : redisUrl;

    return {
        url: normalizedUrl,
        socket: {
            tls: useTls,
            reconnectStrategy(retries) {
                return Math.min(retries * 200, 2000);
            },
        },
    };
}

async function getRedisClient() {
    if (!process.env.REDIS_URL) {
        throw new Error('REDIS_URL is required for realtime session storage.');
    }

    if (!redisClient) {
        redisClient = createClient(buildRedisOptions(process.env.REDIS_URL));

        redisClient.on('error', (error) => {
            console.error('[redis]', error.message);
        });

        connectionPromise = redisClient.connect();
    }

    if (!redisClient.isOpen) {
        await connectionPromise;
    }

    return redisClient;
}

module.exports = { getRedisClient };
