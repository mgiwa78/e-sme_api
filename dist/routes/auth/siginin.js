"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../../middleware/validate-request");
const Auth_Controller_1 = require("../../controllers/Auth-Controller");
const signinRouter = express_1.default.Router();
exports.signinRouter = signinRouter;
signinRouter.get("/", (res, req) => {
    console.log(`Sign In Route`);
    req.send();
});
signinRouter.post("/", [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be valid"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters")
], validate_request_1.ValidateRequest, Auth_Controller_1.SignIn__AUTH__POST);
//# sourceMappingURL=siginin.js.map