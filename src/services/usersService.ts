import bcrypt from "bcrypt";
import { Users } from "../database/entities/users";
import { UsersTypes } from "../libs/types";
import { DBMS_MYSQL } from "../database/databaseConnect";
import { validateSignUp } from "../validators/validate";
import { errorsText } from "../libs/errors/texts";
import { Repository } from "typeorm/repository/Repository";
class UsersService {
  private userRepository: Repository<Users>;

  constructor() {
    this.userRepository = DBMS_MYSQL.getRepository(Users);
  }

  async createUser(payload: UsersTypes): Promise<void> {
    const user: UsersTypes = await validateSignUp.validateAsync(payload);
    const password = payload.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepository.save({
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
      throw new Error(errorsText.userNotExist);
    }
  }

  async findUserByEmail({ email }: { email: string }) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new Error(errorsText.userNotExist);
    return user;
  }
}
export default new UsersService();
