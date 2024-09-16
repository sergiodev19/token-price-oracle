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
exports.getUserById = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
const utils_1 = require("../utils");
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = new mongoose_1.Types.ObjectId(req.params.id);
    try {
        const user = yield models_1.UserModel.findById(id, '-password').exec();
        if (!user) {
            throw new utils_1.NotFoundError(`User does not exists with this id ${req.params.id}`);
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
//# sourceMappingURL=users.js.map