import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface UserPayload {
  id: string;
  type: string;
  roles: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    req.currentUser = payload;
  } catch (error) {}
  next();
};
