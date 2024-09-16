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
exports.getAggregatedPrice = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
const services_1 = require("../services");
const getAggregatedPrice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { symbol } = req.params;
    try {
        const dataFromCache = yield services_1.cacheService.get(symbol);
        if (dataFromCache) {
            return res.status(200).json(JSON.parse(dataFromCache));
        }
        const tokenPair = yield models_1.TokenPairModel.findOne({ symbol }).populate('dataSources').exec();
        if (!tokenPair) {
            throw new utils_1.NotFoundError('Token pair not found');
        }
        const aggregatedPrice = yield services_1.priceService.aggregate(tokenPair);
        yield services_1.cacheService.set(symbol, JSON.stringify(aggregatedPrice));
        return res.status(200).json(aggregatedPrice);
    }
    catch (error) {
        return next(error);
    }
});
exports.getAggregatedPrice = getAggregatedPrice;
//# sourceMappingURL=aggregated-price.js.map