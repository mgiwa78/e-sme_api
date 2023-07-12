"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRouter_1 = __importDefault(require("./auth/authRouter"));
const usersRouter_1 = __importDefault(require("./users/usersRouter"));
const sme_1 = __importDefault(require("./sme/sme"));
const Request_Controller_1 = require("../controllers/Request-Controller");
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../middleware/validate-request");
let rootRouter = (0, express_1.Router)();
rootRouter.get("/", (req, res) => {
    res.send("Hey this is my API running 🥳");
});
rootRouter.use("/auth", authRouter_1.default);
rootRouter.use("/organizations", sme_1.default);
rootRouter.use("/users", usersRouter_1.default);
rootRouter.post("/request", [
    (0, express_validator_1.body)("email").isEmail().withMessage("Email must be valid"),
    (0, express_validator_1.body)("description").exists().withMessage("SME Description is required"),
    (0, express_validator_1.body)("roles").exists().withMessage("User roles are required"),
    (0, express_validator_1.body)("type").isArray().withMessage("User type is required"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters")
], validate_request_1.ValidateRequest, Request_Controller_1.Create__SME_REQUEST__POST);
exports.default = rootRouter;
//# sourceMappingURL=rootRouter.js.map