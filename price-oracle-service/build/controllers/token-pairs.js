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
exports.deleteTokenPair = exports.getTokenPairs = exports.getTokenPairBySymbol = exports.getTokenPairById = exports.updateTokenPair = exports.createTokenPair = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
const utils_1 = require("../utils");
const createTokenPair = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { price, symbol, address } = req.body;
    try {
        const tokenPairExists = yield models_1.TokenPairModel.findOne({
            $or: [{ symbol }, { address }],
        }).exec();
        if (tokenPairExists) {
            throw new utils_1.BadRequestError(`Token pair already exists with this symbol ${symbol} or this address ${address}`);
        }
        const tokenPair = {
            symbol,
            price: price || 0,
            address,
        };
        const result = new models_1.TokenPairModel(tokenPair).save();
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.createTokenPair = createTokenPair;
const updateTokenPair = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongoose_1.Types.ObjectId(req.params.id);
    const { price, symbol, address } = req.body;
    try {
        const tokenPair = yield models_1.TokenPairModel.findById(id).exec();
        if (!tokenPair) {
            throw new utils_1.NotFoundError(`Token pair does not exists with this id ${id}`);
        }
        const tokenPairUpdated = {
            symbol: symbol || tokenPair.symbol,
            price: price || tokenPair.price,
            address: address || tokenPair.address,
        };
        yield models_1.TokenPairModel.updateOne({ _id: id }, { $set: tokenPairUpdated }).exec();
        res.status(200).json({ updatedId: req.params.id });
    }
    catch (error) {
        next(error);
    }
});
exports.updateTokenPair = updateTokenPair;
const getTokenPairById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongoose_1.Types.ObjectId(req.params.id);
    try {
        const tokenPair = yield models_1.TokenPairModel.findById(id).exec();
        if (!tokenPair) {
            throw new utils_1.NotFoundError(`Token pair does not exists with this id ${id}`);
        }
        res.status(200).json(tokenPair);
    }
    catch (error) {
        next(error);
    }
});
exports.getTokenPairById = getTokenPairById;
const getTokenPairBySymbol = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { symbol } = req.params;
    try {
        const tokenPair = yield models_1.TokenPairModel.findOne({ symbol }).exec();
        if (!tokenPair) {
            throw new utils_1.NotFoundError(`Token pair does not exists with this symbol ${symbol}`);
        }
        res.status(200).json(tokenPair);
    }
    catch (error) {
        next(error);
    }
});
exports.getTokenPairBySymbol = getTokenPairBySymbol;
const getTokenPairs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenPairs = yield models_1.TokenPairModel.find().exec();
        res.status(200).json(tokenPairs);
    }
    catch (error) {
        next(error);
    }
});
exports.getTokenPairs = getTokenPairs;
const deleteTokenPair = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongoose_1.Types.ObjectId(req.params.id);
    try {
        yield models_1.TokenPairModel.deleteOne({ _id: id }).exec();
        res.status(200).json({ deletedId: req.params.id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTokenPair = deleteTokenPair;
//# sourceMappingURL=token-pairs.js.map