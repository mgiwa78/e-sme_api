import { Request, Response } from "express";

import { User } from "@models/user";
import { BadRequestError } from "@errors/bad-request-error";
import jwt from "jsonwebtoken";
import { SME } from "@models/sme";
import { query, validationResult, body } from "express-validator";

export const Create__SME__POST = async (req: Request, res: Response) => {
  const { smeEmail, address, name } = req.body;

  const existingUser = await User.findOne({ smeEmail, address, name });
  if (existingUser) {
    throw new BadRequestError("Email already in use");
  }

  const sme = SME.build({ smeEmail, address, name });
  await sme.save();

  // Generate jwt
  const smeJwt = jwt.sign(
    {
      sme: sme
    },
    process.env.JWT_KEY!
  );
};

export const Fetch__SME__GET = async (req: Request, res: Response) => {
  // User.create({ firstName: "Muhammad", lastName: "Giwa",email:"mgiwa@a.com",password:"Password" });

  const SMEs = await SME.find({});

  res.send(SMEs);
};

export const Create__SME_REQUEST__POST = async (
  req: Request,
  res: Response
) => {
  const { smeEmail, address, name } = req.body;

  const existingUser = await User.findOne({ smeEmail, address, name });
  if (existingUser) {
    throw new BadRequestError("Email already in use");
  }

  const sme = SME.build({ smeEmail, address, name });
  await sme.save();

  // Generate jwt
  const smeJwt = jwt.sign(
    {
      sme: sme
    },
    process.env.JWT_KEY!
  );

  //Store it on the session obj

  res.status(201).send(sme);
};
