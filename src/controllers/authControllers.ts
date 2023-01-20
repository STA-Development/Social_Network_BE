import { Request, Response } from "express";
import * as dotenv from "dotenv";
import UsersLogin from "../services/authService";
dotenv.config();

export const loginUserHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const record = await UsersLogin.auth(email, password);
  return res.json(record);
};
