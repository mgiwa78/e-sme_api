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
exports.Create__SME_REQUEST__POST = exports.Fetch__SME__GET = exports.Create__SME__POST = void 0;
const user_1 = require("../models/user");
const bad_request_error_1 = require("../errors/bad-request-error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sme_1 = require("../models/sme");
const Create__SME__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { smeEmail, address, name } = req.body;
    const existingUser = yield user_1.User.findOne({ smeEmail, address, name });
    if (existingUser) {
        throw new bad_request_error_1.BadRequestError("Email already in use");
    }
    const sme = sme_1.SME.build({ smeEmail, address, name });
    yield sme.save();
    // Generate jwt
    const smeJwt = jsonwebtoken_1.default.sign({
        sme: sme
    }, process.env.JWT_KEY);
});
exports.Create__SME__POST = Create__SME__POST;
const Fetch__SME__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // User.create({ firstName: "Muhammad", lastName: "Giwa",email:"mgiwa@a.com",password:"Password" });
    const SMEs = yield sme_1.SME.find({});
    res.send(SMEs);
});
exports.Fetch__SME__GET = Fetch__SME__GET;
const Create__SME_REQUEST__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { smeEmail, address, name } = req.body;
    const existingUser = yield user_1.User.findOne({ smeEmail, address, name });
    if (existingUser) {
        throw new bad_request_error_1.BadRequestError("Email already in use");
    }
    const sme = sme_1.SME.build({ smeEmail, address, name });
    yield sme.save();
    // Generate jwt
    const smeJwt = jsonwebtoken_1.default.sign({
        sme: sme
    }, process.env.JWT_KEY);
    //Store it on the session obj
    res.status(201).send(sme);
});
exports.Create__SME_REQUEST__POST = Create__SME_REQUEST__POST;
//# sourceMappingURL=SME-Controller.js.map