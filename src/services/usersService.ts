import bcrypt from "bcrypt";
import { Users } from "../database/entities/users";
import { ReqItemsTypes } from "../libs/types";
import { connectDB } from "../database/databaseConnect";
import { ValidateSignUp } from "../validators/validate";
import { Errors } from "../libs/errors/texts";
import { Repository } from "typeorm/repository/Repository";
import { upload } from "../libs/storage/storage";

class UsersService {
  private userRepository: Repository<Users>;

  constructor() {
    this.userRepository = connectDB.getRepository(Users);
  }

  async createUser(payload: ReqItemsTypes): Promise<Users> {
    const user: ReqItemsTypes = await ValidateSignUp.validateAsync(payload);
    const password = payload.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.save({
      ...user,
      password: hashedPassword,
    });
  }
  async readUsers() {
    return this.userRepository.find();
  }

  async readOneUser(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      return user;
    } catch {
      throw new Error(Errors.userExist);
    }
  }

  async findUserByEmail({ email }: { email: string }) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new Error(Errors.userExist);
    return user;
  }
  // async updateProfile(id: number) {
  //   const profle = upload.single("ProfileImg");
  //   return await this.userRepository.update({ id }, { profile_image: 'profile' });
  // }
}
export default new UsersService();
