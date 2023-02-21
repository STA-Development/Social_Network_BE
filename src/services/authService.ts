import usersService from "../services/usersService";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { errorsText } from "../libs/errors/texts";
type usersType = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
};
dotenv.config();
class UsersLogin {
  async auth(id: number, email: string, password: string): Promise<usersType> {
    const user = await usersService.findUserByEmail({ email });
    const userPassword = user.password;

    const token = jwt.sign(
      {
        id: user.id,
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
      throw new Error(errorsText.invalidEmail);
    }
  }
}

export default new UsersLogin();
