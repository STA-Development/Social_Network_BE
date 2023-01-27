import { Request, Response } from "express";
import * as dotenv from "dotenv";
import UsersLogin from "../services/authService";
dotenv.config();
class LoginController {
  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const record = await UsersLogin.auth(email, password);
    return res.json(record);
  }
}
export default new LoginController();
