"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const siginin_1 = require("./siginin");
const signout_1 = require("./signout");
const current_user_1 = require("./current-user");
const signup_1 = require("./signup");
let authRouter = (0, express_1.Router)();
authRouter.get("/", (res, req) => {
    console.log(`Auth Route`);
    req.send();
});
authRouter.use("/signin", siginin_1.signinRouter);
authRouter.use("/signout", signout_1.signoutRouter);
authRouter.use("/current-user", current_user_1.currentuserRouter);
authRouter.use("/signup", signup_1.signupRouter);
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map