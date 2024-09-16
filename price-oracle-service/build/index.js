"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = require("express-rate-limit");
const rate_limit_redis_1 = require("rate-limit-redis");
const utils_1 = require("./utils");
const config_1 = require("./config");
const handle = (err, origin) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(`Caught exception: ${err.stack}`);
    console.error(`Exception origin: ${origin}`);
});
process.on('uncaughtException', handle);
process.on('unhandledRejection', handle);
(() => __awaiter(void 0, void 0, void 0, function* () {
    dotenv_1.default.config();
    const mongoose = config_1.Mongoose.getInstance();
    const redis = config_1.Redis.getInstance();
    process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose.disconnect();
        yield redis.disconnect();
        process.exit(0);
    }));
    try {
        const app = (0, express_1.default)();
        yield mongoose.connect();
        yield redis.connect();
        const limiter = (0, express_rate_limit_1.rateLimit)({
            windowMs: 15 * 60 * 1000,
            max: 100,
            standardHeaders: true,
            legacyHeaders: false,
            store: new rate_limit_redis_1.RedisStore({
                sendCommand: (...args) => redis.getClient().sendCommand(args),
            }),
        });
        app.use(limiter);
        app.use((0, helmet_1.default)());
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        const { router } = yield Promise.resolve().then(() => __importStar(require('./routes')));
        app.use('/api', router);
        app.all('*', (req, res, next) => {
            next(new utils_1.NotFoundError('The route does not exists!'));
        });
        app.use(utils_1.errorHandler);
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
    catch (error) {
        console.error(error);
        yield mongoose.disconnect();
        yield redis.disconnect();
        process.exit(1);
    }
}))();
//# sourceMappingURL=index.js.map