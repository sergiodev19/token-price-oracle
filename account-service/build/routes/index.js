"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const users_1 = __importDefault(require("./users"));
const router = (0, express_1.Router)();
exports.router = router;
router.use('/auth', auth_1.default);
router.use('/users', users_1.default);
//# sourceMappingURL=index.js.map