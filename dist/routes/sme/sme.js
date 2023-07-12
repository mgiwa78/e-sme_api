"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SME_Controller_1 = require("../../controllers/SME-Controller");
const express_validator_1 = require("express-validator");
let organizationRouter = (0, express_1.Router)();
organizationRouter.get("/", SME_Controller_1.Fetch__SME__GET);
organizationRouter.post("/", [
    (0, express_validator_1.body)("name", "Organization name is required").notEmpty(),
    (0, express_validator_1.body)("address", "Organization address is required").notEmpty(),
    (0, express_validator_1.body)("token", "Organization access token is required").notEmpty()
], SME_Controller_1.Create__SME__POST);
organizationRouter.post("/request", [
    (0, express_validator_1.body)("name", "Organization name is required").notEmpty(),
    (0, express_validator_1.body)("address", "Organization address is required").notEmpty(),
    (0, express_validator_1.body)("token", "Organization access token is required").notEmpty()
], SME_Controller_1.Create__SME_REQUEST__POST);
// organizationRouter.put("/", Create__USER__POST);
exports.default = organizationRouter;
//# sourceMappingURL=sme.js.map