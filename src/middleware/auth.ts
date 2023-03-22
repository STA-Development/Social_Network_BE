import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { errorsText } from "../libs/errors/texts";
import { JWTPayload } from "../libs/types";

dotenv.config();
const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token;
  if (req.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.TOKEN_SECRET as string
      ) as JWTPayload;
      const { id } = decoded;
      req.body.id = id;
      next();
    } catch (error) {
      res.status(401);
      throw new Error(errorsText.notAuthToken);
    }
  }
  if (!token) {
    res.status(401);
    throw new Error(errorsText.TokenNotExist);
  }
};
export { protect };
