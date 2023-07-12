import { Request, Response } from "express";

import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
import { SME } from "../models/sme";
import { Password } from "../services/password";

export const SignIn__AUTH__POST = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = (await User.findOne({ email: email })) as any;

  if (user) {
    const verifyPassword = await Password.compare(user.password, password);
    try {
      if (verifyPassword) {
        const token = jwt.sign({ user: user }, process.env.JWT_KEY!, {
          expiresIn: "2h"
        });

        const userData = { ...user.toObject(), password: undefined };

        return res.status(200).json({
          staus: "success",
          data: { userAuth: userData, userJwt: token }
        });
      }
      return res.status(404).json({ message: "Invalid user credentials" });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  } else {
    return res.status(404).json({ message: "Invalid user credentials" });
  }
};

module.exports = { SignIn__AUTH__POST };
