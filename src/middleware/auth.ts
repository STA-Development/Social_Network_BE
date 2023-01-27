import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Errors } from "../libs/errors/texts";
dotenv.config();
const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (req.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
      req.body.email = decoded;
      next();
    } catch (error) {
      res.status(401);
      throw new Error(Errors.AuthToken);
    }
  }
  if (!token) {
    res.status(401);
    throw new Error(Errors.TokenExist);
  }
};
export { protect };
