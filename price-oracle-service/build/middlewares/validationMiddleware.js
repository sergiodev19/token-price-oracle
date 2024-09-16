"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = require("mongoose");
const utils_1 = require("../utils");
const validationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new utils_1.BadRequestError(errors.array()[0].msg));
    }
    if (req.params.id && !(0, mongoose_1.isValidObjectId)(req.params.id)) {
        return next(new utils_1.BadRequestError('Invalid id'));
    }
    next();
};
exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=validationMiddleware.js.map