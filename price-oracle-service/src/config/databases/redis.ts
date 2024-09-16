import { createClient, RedisClientType } from 'redis';
import { InternalError } from '../../utils';

class Redis {
  private static instance: Redis;
  private client: RedisClientType;
  private isConnected: boolean = false;

  /**
   * Creates an instance of the Redis class.
   * @param url - The URL for connecting to the Redis server.
   */
  private constructor(url: string) {
    this.client = createClient({ url });
  }

  /**
   * Retrieves the singleton instance of the Redis class.
   * @returns The singleton instance of the Redis class.
   * @throws InternalError if the "REDIS_URL" environment variable is not set.
   */
  public static getInstance(): Redis {
    if (!process.env.REDIS_URL) {
      throw new InternalError('Invalid/Missing environment variable: "REDIS_URL"');
    }

    if (Redis.instance) return Redis.instance;

    Redis.instance = new Redis(process.env.REDIS_URL);

    return Redis.instance;
  }

  /**
   * Connects to the Redis server.
   * @returns A promise that resolves when the connection is successful.
   * @throws Error if there is an issue connecting to Redis.
   */
  public async connect(): Promise<void> {
    if (!this.isConnected) {
      try {
        await this.client.connect();
        this.isConnected = true;
        console.log('Redis connected successfully');
      } catch (error) {
        console.error(`Failed to connect to the Redis: ${error}`);
        throw error;
      }
    }
  }

  /**
   * Retrieves the Redis client instance.
   * @returns The Redis client instance.
   * @throws InternalError if the Redis connection has not been established.
   */
  public getClient(): RedisClientType {
    if (!this.client) throw new InternalError('Redis connection not established');
    return this.client;
  }

  /**
   * Disconnects from the Redis server.
   * @returns A promise that resolves when the disconnection is complete.
   */
  public async disconnect(): Promise<void> {
    await this.client.disconnect();
    console.log('Redis connection closed');
  }
}

export { Redis, RedisClientType };
