"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceModel = exports.DATA_SOURCE_COLLECTION = void 0;
const mongoose_1 = require("mongoose");
const TokenPairModel_1 = require("./TokenPairModel");
const SupportedDataSourcesModel_1 = require("./SupportedDataSourcesModel");
exports.DATA_SOURCE_COLLECTION = 'data-sources';
const DataSourceSchema = new mongoose_1.Schema({
    tokenPair: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: TokenPairModel_1.TOKEN_PAIRS_COLLECTION,
    },
    source: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: SupportedDataSourcesModel_1.SUPPORTED_DATA_SOURCE_COLLECTION,
    },
}, { timestamps: true });
exports.DataSourceModel = (0, mongoose_1.model)(exports.DATA_SOURCE_COLLECTION, DataSourceSchema);
//# sourceMappingURL=DataSourceModel.js.map