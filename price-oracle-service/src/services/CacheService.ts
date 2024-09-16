import { InternalError } from '../utils';
import { Redis, RedisClientType } from '../config';

/**
 * A service for interacting with the Redis cache.
 * @class
 */
class CacheService {
  private redisClient: RedisClientType;

  /**
   * Creates an instance of CacheService.
   * @param {Redis} redis - An instance of the Redis client.
   */
  constructor(redis: Redis) {
    this.redisClient = redis.getClient();
  }

  /**
   * Retrieves a value from the cache by its key.
   * @param {string} symbol - The key for the cached data.
   * @returns {Promise<string | null>} - The cached value or null if not found.
   * @throws {InternalError} - Throws an error if the Redis operation fails.
   */
  async get(symbol: string): Promise<string | null> {
    try {
      return await this.redisClient.get(symbol);
    } catch (error) {
      throw new InternalError((error as unknown as Error).message);
    }
  }

  /**
   * Sets a value in the cache with a specified expiration time.
   * @param {string} key - The key for the cached data.
   * @param {string} value - The value to be cached.
   * @param {number} [expire=300] - The expiration time in seconds (default is 300 seconds).
   * @returns {Promise<string>} - The result of the Redis operation.
   * @throws {InternalError} - Throws an error if the Redis operation fails.
   */
  async set(key: string, value: string, expire: number = 300): Promise<string | null> {
    try {
      return await this.redisClient.set(key, value, { EX: expire });
    } catch (error) {
      throw new InternalError((error as unknown as Error).message);
    }
  }

  /**
   * Deletes a value from the cache by its key.
   * @param {string} key - The key for the cached data.
   * @returns {Promise<number>} - The number of keys that were removed.
   * @throws {InternalError} - Throws an error if the Redis operation fails.
   */
  async del(key: string): Promise<number> {
    try {
      return await this.redisClient.del(key);
    } catch (error) {
      throw new InternalError((error as unknown as Error).message);
    }
  }
}

/**
 * An instance of CacheService using the Redis client.
 * @type {CacheService}
 */
export const cacheService = new CacheService(Redis.getInstance());
