import { Redis } from '../config';
declare class CacheService {
    private redisClient;
    constructor(redis: Redis);
    get(symbol: string): Promise<string | null>;
    set(key: string, value: string, expire?: number): Promise<string | null>;
    del(key: string): Promise<number>;
}
export declare const cacheService: CacheService;
export {};
//# sourceMappingURL=CacheService.d.ts.map