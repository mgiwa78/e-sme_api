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
exports.Create__SME_REQUEST__POST = void 0;
const bad_request_error_1 = require("../errors/bad-request-error");
const sme_1 = require("../models/sme");
const Create__SME_REQUEST__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, smeEmail } = req.body;
    const existingSME = yield sme_1.SME.findOne({ name });
    if (existingSME) {
        throw new bad_request_error_1.BadRequestError("SME name is already in use");
    }
    const smeProfile = sme_1.SME.build({ name, address, smeEmail });
    yield smeProfile.save();
    res.send(sme_1.SME);
});
exports.Create__SME_REQUEST__POST = Create__SME_REQUEST__POST;
module.exports = { Create__SME_REQUEST__POST: exports.Create__SME_REQUEST__POST };
//# sourceMappingURL=Request-Controller.js.map