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
exports.SME = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const sme_token_1 = require("../services/sme-token");
const SMESchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    smeEmail: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        versionKey: false,
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        }
    }
});
SMESchema.pre("save", function (done) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("token")) {
            const hashed = yield sme_token_1.SMEToken.toHash(this.get("token"));
            this.set("token", hashed);
        }
        done();
    });
});
SMESchema.statics.build = (attrs) => {
    return new SME(attrs);
};
const SME = mongoose_1.default.model("SME", SMESchema);
exports.SME = SME;
//# sourceMappingURL=sme.js.map