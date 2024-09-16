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
exports.deleteSupportedDataSourceById = exports.getSupportedDataSources = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
const getSupportedDataSources = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supportedDataSources = yield models_1.SupportedDataSourcesModel.find().exec();
        res.status(200).json(supportedDataSources);
    }
    catch (error) {
        next(error);
    }
});
exports.getSupportedDataSources = getSupportedDataSources;
const deleteSupportedDataSourceById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongoose_1.Types.ObjectId(req.params.id);
    try {
        yield models_1.SupportedDataSourcesModel.deleteOne({ _id: id }).exec();
        res.status(200).json({ deletedId: req.params.id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteSupportedDataSourceById = deleteSupportedDataSourceById;
//# sourceMappingURL=supported-data-sources.js.map