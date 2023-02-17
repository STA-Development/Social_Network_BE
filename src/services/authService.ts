import usersService from "../services/usersService";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Errors } from "../libs/errors/texts";

dotenv.config();
class UsersLogin {
  async auth(id: number, email: string, password: string) {
    const user = await usersService.findUserByEmail({ email });
    const userPassword = user.password;

    const token = jwt.sign(
      {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
      process.env.TOKEN_SECRET as string
    );
    if (await bcrypt.compare(password, userPassword)) {
      return {
        id: user.id,
        email,
        firstName: user.first_name,
        lastName: user.last_name,
        token,
      };
    } else {
      throw new Error(Errors.validError);
    }
  }
}

export default new UsersLogin();
