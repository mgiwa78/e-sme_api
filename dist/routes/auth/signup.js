"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../../middleware/validate-request");
const User_Controller_1 = require("../../controllers/User-Controller");
const signupRouter = express_1.default.Router();
exports.signupRouter = signupRouter;
signupRouter.post("/", [
    (0, express_validator_1.body)("firstName").notEmpty().withMessage("Last name is required"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email must be valid"),
    (0, express_validator_1.body)("lastName").notEmpty().withMessage("First name is required"),
    (0, express_validator_1.body)("roles")
        .notEmpty()
        .withMessage("User roles are required")
        .isIn(["Admin", "User", "Super Admin"])
        .withMessage("Invalid user type"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters")
], validate_request_1.ValidateRequest, User_Controller_1.Create__USER__POST);
signupRouter.get("/", (req, res) => {
    res.send("signup Route");
});
//# sourceMappingURL=signup.js.map