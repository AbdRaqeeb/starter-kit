import Redis from 'ioredis';

import Config from '@workspace/utils/config';
import logger from '@workspace/utils/logger';

const createRedisClient = (url: string, options = {}) => {
    const client = new Redis(url, {
        retryStrategy: (times) => {
            if (times >= 3) return null;
            return Math.min(times * 500, 20000);
        },
        ...options,
    });

    // Prevent memory leaks
    client.setMaxListeners(20);
    return client;
};

// Create main Redis client
export const redis = createRedisClient(Config.redisUrl, {
    enableReadyCheck: true,
});

// Setup event handlers
const setupRedisEvents = (client: Redis, context = 'Main') => {
    const events = {
        connect: `[Redis ${context}] Connected successfully`,
        ready: `[Redis ${context}] Ready to accept commands`,
        close: `[Redis ${context}] Connection closed`,
        end: `[Redis ${context}] Connection ended`,
        reconnecting: `[Redis ${context}] Reconnecting`,
    };

    // Attach standard events
    Object.entries(events).forEach(([event, message]) => {
        client.on(event, () => logger.info({}, message));
    });

    // Handle errors
    client.on('error', (error) => {
        logger.error({ error }, `[Redis ${context}] Error`);
    });
};

setupRedisEvents(redis, 'Main');
