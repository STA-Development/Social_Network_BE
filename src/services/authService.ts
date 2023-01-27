import usersService from "../services/usersService";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Errors } from "../libs/errors/texts";

dotenv.config();
class UsersLogin {
  async auth(email: string, password: string) {
    const user = await usersService.findUserByEmail({ email });
    const userPassword = user.password;
    const token = jwt.sign({ email }, process.env.TOKEN_SECRET as string);
    if (await bcrypt.compare(password, userPassword)) {
      return { email, token };
    } else {
      throw new Error(Errors.validError);
    }
  }
}

export default new UsersLogin();
