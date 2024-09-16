"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redis = void 0;
const redis_1 = require("redis");
const utils_1 = require("../../utils");
class Redis {
    constructor(url) {
        this.isConnected = false;
        this.client = (0, redis_1.createClient)({ url });
    }
    static getInstance() {
        if (!process.env.REDIS_URL) {
            throw new utils_1.InternalError('Invalid/Missing environment variable: "REDIS_URL"');
        }
        if (Redis.instance)
            return Redis.instance;
        Redis.instance = new Redis(process.env.REDIS_URL);
        return Redis.instance;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isConnected) {
                try {
                    yield this.client.connect();
                    this.isConnected = true;
                    console.log('Redis connected successfully');
                }
                catch (error) {
                    console.error(`Failed to connect to the Redis: ${error}`);
                    throw error;
                }
            }
        });
    }
    getClient() {
        if (!this.client)
            throw new utils_1.InternalError('Redis connection not established');
        return this.client;
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.disconnect();
            console.log('Redis connection closed');
        });
    }
}
exports.Redis = Redis;
//# sourceMappingURL=redis.js.map