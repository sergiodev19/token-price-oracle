"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const utils_1 = require("../utils");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/register', (0, express_validator_1.checkSchema)(utils_1.userValidationSchema), middlewares_1.validationMiddleware, controllers_1.registerUser);
router.post('/login', (0, express_validator_1.checkSchema)({
    email: utils_1.userValidationSchema.email,
    password: utils_1.userValidationSchema.password,
}), middlewares_1.validationMiddleware, controllers_1.loginUser);
exports.default = router;
//# sourceMappingURL=auth.js.map