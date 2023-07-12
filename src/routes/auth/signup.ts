import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { ValidateRequest } from "../../middleware/validate-request";

import { User } from "../../models/user";
import { BadRequestError } from "../../errors/bad-request-error";
import { Create__USER__POST } from "controllers/User-Controller";

const signupRouter = express.Router();

signupRouter.post(
  "/",
  [
    body("firstName").notEmpty().withMessage("Last name is required"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid"),
    body("lastName").notEmpty().withMessage("First name is required"),
    body("roles")
      .notEmpty()
      .withMessage("User roles are required")
      .isIn(["Admin", "User", "Super Admin"])
      .withMessage("Invalid user type"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters")
  ],
  ValidateRequest,
  Create__USER__POST
);

signupRouter.get("/", (req, res) => {
  res.send("signup Route");
});

export { signupRouter };
