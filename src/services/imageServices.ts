import { Users } from "../database/entities/users";
import { connectDB } from "../database/databaseConnect";
import { Errors } from "../libs/errors/texts";
import { Repository } from "typeorm/repository/Repository";

class ImageService {
  private userRepository: Repository<Users>;

  constructor() {
    this.userRepository = connectDB.getRepository(Users);
  }

  async getUserProfile(id: number) {
    try {
      const userProfile = await this.userRepository.findOne({ where: { id } });
      return userProfile;
    } catch {
      throw new Error(Errors.userExist);
    }
  }
  async updateImage(id: number, profile: string) {
    return await this.userRepository.update({ id }, { profile_image: profile });
  }
}
export default new ImageService();
