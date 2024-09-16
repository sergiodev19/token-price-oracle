"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/:id', middlewares_1.validationMiddleware, middlewares_1.authorize, controllers_1.getUserById);
exports.default = router;
//# sourceMappingURL=users.js.map