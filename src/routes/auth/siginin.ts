import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { ValidateRequest } from "../../middleware/validate-request";
import { BadRequestError } from "../../errors/bad-request-error";
import { SignIn__AUTH__POST } from "../../controllers/Auth-Controller";

const signinRouter = express.Router();

signinRouter.get("/", (res, req) => {
  console.log(`Sign In Route`);
  req.send();
});

signinRouter.post(
  "/",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters")
  ],
  ValidateRequest,
  SignIn__AUTH__POST
);

export { signinRouter };
