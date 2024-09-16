"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const userExists = yield models_1.UserModel.findOne({ email }).exec();
        if (userExists) {
            throw new utils_1.BadRequestError(`User already exists with this email ${email}`);
        }
        const user = {
            name,
            email,
            password: yield (0, utils_1.generatePasswordHash)(password),
            createdAt: new Date(),
            updatedAt: null,
        };
        const result = new models_1.UserModel(user).save();
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield models_1.UserModel.findOne({ email }).exec();
        if (!user) {
            throw new utils_1.NotFoundError(`User with this email ${email} not found`);
        }
        const isMatch = yield (0, utils_1.comparePassword)(password, user.password);
        if (!isMatch) {
            throw new utils_1.BadRequestError('Invalid password');
        }
        const tokenPayload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        res.status(200).json(Object.assign(Object.assign({}, tokenPayload), { token: (0, utils_1.generateToken)(tokenPayload) }));
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=auth.js.map