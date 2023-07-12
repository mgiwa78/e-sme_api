"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentuserRouter = void 0;
const express_1 = __importDefault(require("express"));
const current_user_1 = require("../../middleware/current-user");
const currentuserRouter = express_1.default.Router();
exports.currentuserRouter = currentuserRouter;
currentuserRouter.get("/", current_user_1.currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});
//# sourceMappingURL=current-user.js.map