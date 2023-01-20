import { Users } from "../database/entities/users";
import { ReqItemsTypes } from "../libs/types";
import { connectDB } from "../database/databaseConnect";
import bcrypt from "bcrypt";
import { ValidateSignUp } from "../validators/validate";
const userRepository = connectDB.getRepository(Users);
class UsersService {
  async createUser(payload: ReqItemsTypes): Promise<Users> {
    const user: ReqItemsTypes = await ValidateSignUp.validateAsync(payload);
    const password = payload.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    return userRepository.save({
      ...user,
      password: hashedPassword,
    });
  }
  async readUsers(): Promise<Array<Users>> {
    const userRepository = connectDB.getRepository(Users);
    return userRepository.find();
  }
  async readOneUser(id: number): Promise<Users | null> {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) return null;
    return user;
  }
  async findUserByEmail({ email }: { email: string }): Promise<Users> {
    const user = await userRepository.findOneBy({ email });
    if (!user) throw new Error("No User");
    return user;
  }
  async findUser(query: object): Promise<Users | null> {
    return await userRepository.findOneBy(query);
  }
}
export default new UsersService();
