"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userData) => {
    return jsonwebtoken_1.default.sign(userData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_PERIOD,
    });
};
exports.generateToken = generateToken;
//# sourceMappingURL=generateToken.js.map