"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportedDataSourcesModel = exports.SUPPORTED_DATA_SOURCE_COLLECTION = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../utils");
exports.SUPPORTED_DATA_SOURCE_COLLECTION = 'supported-data-sources';
const SupportedDataSourcesSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        enum: {
            values: Object.values(utils_1.SupportedDataSources),
            message: '{VALUE} is not a valid type',
        }
    },
    sourceType: {
        type: String,
        required: true,
        enum: {
            values: Object.values(utils_1.IDataSourceTypes),
            message: '{VALUE} is not a valid type',
        },
    },
}, { timestamps: true });
exports.SupportedDataSourcesModel = (0, mongoose_1.model)(exports.SUPPORTED_DATA_SOURCE_COLLECTION, SupportedDataSourcesSchema);
//# sourceMappingURL=SupportedDataSourcesModel.js.map