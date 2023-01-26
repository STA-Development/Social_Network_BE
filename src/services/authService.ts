import usersService from "../services/usersService";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { validError } from "../libs/errors/error";

dotenv.config();
class UsersLogin {
  async auth(email: string, password: string): Promise<unknown> {
    const user = await usersService.findUserByEmail({ email });
    const userPassword = user.password;
    const errorMessage = validError;
    const token = jwt.sign({ email }, process.env.TOKEN_SECRET as string);
    if (await bcrypt.compare(password, userPassword)) {
      return { email, token };
    } else {
      throw new Error(errorMessage);
    }
  }
}

export default new UsersLogin();
