import { getRedis } from "../redis-connection/redis.client";

class RedisLock {
  constructor(protected readonly redis = getRedis()) {}

  async acquire(key: string, ttlMs: number): Promise<boolean> {
    const result = await this.redis.set(key, "lock", "PX", ttlMs, "NX");
    return result === "OK";
  }

  async release(key: string) {
    await this.redis.del(key);
  }
}

export class RedisCache extends RedisLock {
  constructor(protected readonly redis = getRedis()) {
    super(redis);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key: string, value: unknown, ttlSec: number) {
    await this.redis.set(key, JSON.stringify(value), "EX", ttlSec);
  }
}
