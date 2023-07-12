"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateRequest = void 0;
const express_validator_1 = require("express-validator");
const ValidateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(401).send({ errors: errors.array() });
    }
    next();
};
exports.ValidateRequest = ValidateRequest;
//# sourceMappingURL=validate-request.js.map