import { getRedis } from './redis.client';

export async function checkRedisHealth() {
    await getRedis().ping();
}