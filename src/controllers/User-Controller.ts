import { Request, Response } from "express";

import { User } from "@models/user";
import { BadRequestError } from "@errors/bad-request-error";
import jwt from "jsonwebtoken";

export const Create__USER__POST = async (req: Request, res: Response) => {
  const { email, password, roles, firstName, lastName } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).send({ status: "error", message: "Email already in use" });
  }

  const user = User.build({ email, password, roles, firstName, lastName });
  await user.save();

  // Generate jwt
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_KEY!
  );

  //Store it on the session obj
  req.session = { jwt: userJwt };

  const userData = { ...user.toObject(), password: undefined };

  res.status(201).send({ data: { user: userData, userJwt } });
};

export const Fetch__USERS__GET = async (req: Request, res: Response) => {
  // User.create({ firstName: "Muhammad", lastName: "Giwa",email:"mgiwa@a.com",password:"Password" });

  const users = await User.find({});

  res.send(users);
};
