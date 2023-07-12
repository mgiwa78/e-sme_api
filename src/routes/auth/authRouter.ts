import { Router } from "express";

import { signinRouter } from "./siginin";
import { signoutRouter } from "./signout";
import { currentuserRouter } from "./current-user";
import { signupRouter } from "./signup";

let authRouter = Router();

authRouter.get("/", (res, req) => {
  console.log(`Auth Route`);
  req.send();
});

authRouter.use("/signin", signinRouter);
authRouter.use("/signout", signoutRouter);
authRouter.use("/current-user", currentuserRouter);
authRouter.use("/signup", signupRouter);

export default authRouter;
