import { Router } from "express";

import authRouter from "./auth/authRouter";
import userRouter from "./users/usersRouter";
import organizationRouter from "./sme/sme";
import { Create__SME_REQUEST__POST } from "../controllers/Request-Controller";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
let rootRouter = Router();

rootRouter.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

rootRouter.use("/auth", authRouter);
rootRouter.use("/organizations", organizationRouter);
rootRouter.use("/users", userRouter);

rootRouter.post(
  "/request",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("description").exists().withMessage("SME Description is required"),
    body("roles").exists().withMessage("User roles are required"),
    body("type").isArray().withMessage("User type is required"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters")
  ],
  ValidateRequest,
  Create__SME_REQUEST__POST
);

export default rootRouter;
