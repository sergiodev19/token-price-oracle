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
exports.cacheService = void 0;
const utils_1 = require("../utils");
const config_1 = require("../config");
class CacheService {
    constructor(redis) {
        this.redisClient = redis.getClient();
    }
    get(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.redisClient.get(symbol);
            }
            catch (error) {
                throw new utils_1.InternalError(error.message);
            }
        });
    }
    set(key_1, value_1) {
        return __awaiter(this, arguments, void 0, function* (key, value, expire = 300) {
            try {
                return yield this.redisClient.set(key, value, { 'EX': expire });
            }
            catch (error) {
                throw new utils_1.InternalError(error.message);
            }
        });
    }
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.redisClient.del(key);
            }
            catch (error) {
                throw new utils_1.InternalError(error.message);
            }
        });
    }
}
exports.cacheService = new CacheService(config_1.Redis.getInstance());
//# sourceMappingURL=CacheService.js.map