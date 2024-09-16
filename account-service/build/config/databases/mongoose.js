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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("../../utils");
class Mongoose {
    constructor(mongoURI) {
        this.isConnected = false;
        this.mongoURI = mongoURI;
    }
    static getInstance() {
        if (!process.env.MONGO_URI)
            throw new utils_1.InternalError('Invalid/Missing environment variable "MONGO_URI"');
        if (!Mongoose.instance) {
            Mongoose.instance = new Mongoose(process.env.MONGO_URI);
        }
        return Mongoose.instance;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isConnected) {
                try {
                    yield mongoose_1.default.connect(this.mongoURI);
                    this.isConnected = true;
                    console.log('MongoDB connected successfully');
                }
                catch (error) {
                    console.error('MongoDB connection error:', error);
                    throw error;
                }
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.disconnect();
                this.isConnected = false;
                console.log('MongoDB disconnected');
            }
            catch (error) {
                console.error('MongoDB disconnection error:', error);
                throw error;
            }
        });
    }
}
exports.Mongoose = Mongoose;
//# sourceMappingURL=mongoose.js.map