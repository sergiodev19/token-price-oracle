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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = exports.Db = exports.ObjectId = exports.Mongo = void 0;
const mongodb_1 = require("mongodb");
Object.defineProperty(exports, "Db", { enumerable: true, get: function () { return mongodb_1.Db; } });
Object.defineProperty(exports, "ObjectId", { enumerable: true, get: function () { return mongodb_1.ObjectId; } });
Object.defineProperty(exports, "Collection", { enumerable: true, get: function () { return mongodb_1.Collection; } });
const utils_1 = require("../../../utils");
const validator_1 = require("./validator");
class Mongo {
    constructor(uri) {
        this.client = new mongodb_1.MongoClient(uri);
        this.db = this.client.db();
        this.db.createCollection("users" /* CollectionNames.USERS */, { validator: validator_1.userSchemaValidator });
        this.db.collection("users" /* CollectionNames.USERS */).createIndex({ email: 1 }, { unique: true });
    }
    static getInstance() {
        if (!process.env.MONGO_URI) {
            throw new utils_1.InternalError('Invalid/Missing environment variable: "MONGO_URI"');
        }
        return !Mongo.instance ? new Mongo(process.env.MONGO_URI) : Mongo.instance;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                console.log('Connected to the Mongo');
                this.db = this.client.db();
            }
            catch (error) {
                console.error(`Failed to connect to the Mongo: ${error}`);
                throw error;
            }
        });
    }
    getDb() {
        if (!this.db)
            throw new utils_1.InternalError('Mongo connection not established');
        return this.db;
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.close();
            console.log('Mongo connection closed');
        });
    }
}
exports.Mongo = Mongo;
__exportStar(require("./validator"), exports);
//# sourceMappingURL=index.js.map