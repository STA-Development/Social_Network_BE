import { Request, Response } from "express";
import * as dotenv from "dotenv";
import UsersLogin from "../services/authService";
dotenv.config();
class LoginController {
  async loginUser(req: Request, res: Response) {
    const { id, email, password } = req.body;
    const usersInformation = await UsersLogin.auth(id, email, password);
    return res.json(usersInformation);
  }
}
export default new LoginController();
