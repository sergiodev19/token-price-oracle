"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const supported_data_sources_1 = __importDefault(require("./supported-data-sources"));
const data_sources_1 = __importDefault(require("./data-sources"));
const token_pairs_1 = __importDefault(require("./token-pairs"));
const aggregated_price_1 = __importDefault(require("./aggregated-price"));
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
exports.router = router;
router.use('/supported-data-sources', supported_data_sources_1.default);
router.use('/data-sources', middlewares_1.authorize, data_sources_1.default);
router.use('/token-pairs', token_pairs_1.default);
router.use('/aggregated-price', aggregated_price_1.default);
//# sourceMappingURL=index.js.map