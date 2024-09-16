import { RedisClientType } from 'redis';
declare class Redis {
    private static instance;
    private client;
    private isConnected;
    private constructor();
    static getInstance(): Redis;
    connect(): Promise<void>;
    getClient(): RedisClientType;
    disconnect(): Promise<void>;
}
export { Redis, RedisClientType };
//# sourceMappingURL=index.d.ts.map