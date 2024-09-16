"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const utils_1 = require("../utils");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/', (0, express_validator_1.checkSchema)(utils_1.dataSourceValidationSchema), middlewares_1.validationMiddleware, controllers_1.createDataSource);
router.put('/:id', (0, express_validator_1.checkSchema)(utils_1.dataSourceValidationSchema), middlewares_1.validationMiddleware, controllers_1.updateDataSource);
router.delete('/:id', middlewares_1.validationMiddleware, controllers_1.deleteDataSource);
exports.default = router;
//# sourceMappingURL=data-sources.js.map