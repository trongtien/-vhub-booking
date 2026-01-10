import Redis from 'ioredis';

let redisClient: Redis;

export function getRedis(): Redis {
    if (!redisClient) {
        redisClient = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD || undefined,
            db: Number(process.env.REDIS_DB ?? 0),
            tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
            retryStrategy: (times) => Math.min(times * 100, 2000),
            maxRetriesPerRequest: 3,
        });
    }
    return redisClient;
}