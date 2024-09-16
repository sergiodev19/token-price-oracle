"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/:symbol', middlewares_1.validationMiddleware, controllers_1.getAggregatedPrice);
exports.default = router;
//# sourceMappingURL=aggregated-price.js.map