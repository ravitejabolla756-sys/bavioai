const { createClient } = require('redis');

let redisClient;
let connectionPromise;

async function getRedisClient() {
    if (!process.env.REDIS_URL) {
        throw new Error('REDIS_URL is required for realtime session storage.');
    }

    if (!redisClient) {
        redisClient = createClient({
            url: process.env.REDIS_URL,
            socket: {
                reconnectStrategy(retries) {
                    return Math.min(retries * 200, 2000);
                },
            },
        });

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
