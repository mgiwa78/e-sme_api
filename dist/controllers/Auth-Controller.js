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
exports.SignIn__AUTH__POST = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const password_1 = require("../services/password");
const SignIn__AUTH__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = (yield user_1.User.findOne({ email: email }));
    if (user) {
        const verifyPassword = yield password_1.Password.compare(user.password, password);
        try {
            if (verifyPassword) {
                const token = jsonwebtoken_1.default.sign({ user: user }, process.env.JWT_KEY, {
                    expiresIn: "2h"
                });
                const userData = Object.assign(Object.assign({}, user.toObject()), { password: undefined });
                return res.status(200).json({
                    staus: "success",
                    data: { userAuth: userData, userJwt: token }
                });
            }
            return res.status(404).json({ message: "Invalid user credentials" });
        }
        catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
    else {
        return res.status(404).json({ message: "Invalid user credentials" });
    }
});
exports.SignIn__AUTH__POST = SignIn__AUTH__POST;
module.exports = { SignIn__AUTH__POST: exports.SignIn__AUTH__POST };
//# sourceMappingURL=Auth-Controller.js.map