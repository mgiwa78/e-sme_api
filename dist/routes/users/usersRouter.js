"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_Controller_1 = require("../../controllers/User-Controller");
let userRouter = (0, express_1.Router)();
userRouter.get("/", User_Controller_1.Fetch__USERS__GET);
userRouter.post("/", User_Controller_1.Create__USER__POST);
userRouter.delete("/", (res, req) => {
    console.log(`Auth Route`);
    req.send();
});
userRouter.put("/", User_Controller_1.Create__USER__POST);
exports.default = userRouter;
//# sourceMappingURL=usersRouter.js.map