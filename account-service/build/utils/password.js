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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.generatePasswordHash = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generatePasswordHash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const rounds = process.env.BCRYPT_SALT_ROUNDS ? Number(process.env.BCRYPT_SALT_ROUNDS) : 10;
    const salt = yield bcryptjs_1.default.genSalt(rounds);
    return bcryptjs_1.default.hashSync(password, salt);
});
exports.generatePasswordHash = generatePasswordHash;
const comparePassword = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, hash);
});
exports.comparePassword = comparePassword;
//# sourceMappingURL=password.js.map