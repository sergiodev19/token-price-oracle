"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.validationMiddleware, controllers_1.getSupportedDataSources);
router.delete('/:id', middlewares_1.authorize, middlewares_1.validationMiddleware, controllers_1.deleteSupportedDataSourceById);
exports.default = router;
//# sourceMappingURL=supported-data-sources.js.map