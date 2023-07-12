import { Request, Response } from "express";

import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
import { SME } from "@models/sme";

export const Create__SME_REQUEST__POST = async (
  req: Request,
  res: Response
) => {
  const { name, address, smeEmail } = req.body;

  const existingSME = await SME.findOne({ name });

  if (existingSME) {
    throw new BadRequestError("SME name is already in use");
  }

  const smeProfile = SME.build({ name, address, smeEmail });
  await smeProfile.save();

  res.send(SME);
};

module.exports = { Create__SME_REQUEST__POST };
