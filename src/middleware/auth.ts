import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { AuthToken, TokenExist } from "../libs/errors/error";
dotenv.config();
const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  const notToken = AuthToken;
  if (req.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
      req.body.email = decoded;
      next();
    } catch (error) {
      res.status(401);
      throw new Error(notToken);
    }
  }
  if (!token) {
    res.status(401);
    throw new Error(TokenExist);
  }
};
export { protect };
