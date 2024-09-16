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
exports.deleteDataSource = exports.updateDataSource = exports.createDataSource = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
const utils_1 = require("../utils");
const createDataSource = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { symbol, sourceName } = req.body;
    try {
        const tokenPair = yield models_1.TokenPairModel.findOne({ symbol }).exec();
        const source = yield models_1.SupportedDataSourcesModel.findOne({ name: sourceName }).exec();
        if (!tokenPair) {
            throw new utils_1.NotFoundError(`Token pair does not exists with this symbol ${symbol}`);
        }
        if (!source) {
            throw new utils_1.NotFoundError(`Supported source does not exists with this name ${sourceName}`);
        }
        const dataSource = {
            tokenPair: tokenPair._id,
            source: source._id,
        };
        const newDataSource = yield new models_1.DataSourceModel(dataSource).save();
        yield models_1.TokenPairModel.updateOne({ symbol }, { $set: { dataSources: [...tokenPair.dataSources, newDataSource._id] } });
        res.status(201).json(newDataSource);
    }
    catch (error) {
        next(error);
    }
});
exports.createDataSource = createDataSource;
const updateDataSource = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongoose_1.Types.ObjectId(req.params.id);
    const { symbol, sourceName } = req.body;
    try {
        const dataSource = yield models_1.DataSourceModel.findById(id).exec();
        if (!dataSource) {
            throw new utils_1.NotFoundError(`Data source does not exists with this id ${id}`);
        }
        const updated = {};
        if (symbol) {
            const tokenPair = yield models_1.TokenPairModel.findById(id).exec();
            if (!tokenPair) {
                throw new utils_1.NotFoundError(`Token pair does not exists with this symbol ${symbol}`);
            }
            updated.tokenPair = tokenPair._id;
        }
        if (sourceName) {
            const source = yield models_1.SupportedDataSourcesModel.findOne({ name: sourceName }).exec();
            if (!source) {
                throw new utils_1.NotFoundError(`Supported source does not exists with this name ${sourceName}`);
            }
            updated.source = source._id;
        }
        yield models_1.DataSourceModel.updateOne({ _id: id }, { $set: updated }).exec();
        res.status(200).json({ updatedId: req.params.id });
    }
    catch (error) {
        next(error);
    }
});
exports.updateDataSource = updateDataSource;
const deleteDataSource = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongoose_1.Types.ObjectId(req.params.id);
    try {
        yield models_1.DataSourceModel.deleteOne({ _id: id }).exec();
        res.status(200).json({ deletedId: req.params.id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteDataSource = deleteDataSource;
//# sourceMappingURL=data-sources.js.map