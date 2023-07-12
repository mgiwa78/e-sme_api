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
exports.Fetch__USERS__GET = exports.Create__USER__POST = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Create__USER__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, roles, firstName, lastName } = req.body;
    const existingUser = yield user_1.User.findOne({ email });
    if (existingUser) {
        res.status(400).send({ status: "error", message: "Email already in use" });
    }
    const user = user_1.User.build({ email, password, roles, firstName, lastName });
    yield user.save();
    // Generate jwt
    const userJwt = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY);
    //Store it on the session obj
    req.session = { jwt: userJwt };
    const userData = Object.assign(Object.assign({}, user.toObject()), { password: undefined });
    res.status(201).send({ data: { user: userData, userJwt } });
});
exports.Create__USER__POST = Create__USER__POST;
const Fetch__USERS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // User.create({ firstName: "Muhammad", lastName: "Giwa",email:"mgiwa@a.com",password:"Password" });
    const users = yield user_1.User.find({});
    res.send(users);
});
exports.Fetch__USERS__GET = Fetch__USERS__GET;
//# sourceMappingURL=User-Controller.js.map