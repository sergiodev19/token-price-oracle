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
exports.TokenPairModel = exports.TOKEN_PAIRS_COLLECTION = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../utils");
const DataSourceModel_1 = require("./DataSourceModel");
const services_1 = require("../services");
exports.TOKEN_PAIRS_COLLECTION = 'token-pairs';
const TokenPairSchema = new mongoose_1.Schema({
    symbol: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    dataSources: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: DataSourceModel_1.DATA_SOURCE_COLLECTION,
            required: false,
        },
    ],
}, { timestamps: true });
TokenPairSchema.post('deleteOne', { document: true, query: false }, (doc) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield DataSourceModel_1.DataSourceModel.deleteMany({ tokenPair: doc._id });
        yield services_1.cacheService.del(doc.symbol);
    }
    catch (error) {
        throw new utils_1.InternalError('An error occurred during post delete hook of token pair: ' + error.message);
    }
}));
exports.TokenPairModel = (0, mongoose_1.model)(exports.TOKEN_PAIRS_COLLECTION, TokenPairSchema);
//# sourceMappingURL=TokenPairModel.js.map