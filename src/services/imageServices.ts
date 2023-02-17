import { Users } from "../database/entities/users";
import { connectDB } from "../database/databaseConnect";
import { Repository } from "typeorm/repository/Repository";

class ImageService {
  private userRepository: Repository<Users>;

  constructor() {
    this.userRepository = connectDB.getRepository(Users);
  }

  async updateProfileImage(id: number, profile: string) {
    return await this.userRepository.update({ id }, { profile_image: profile });
  }
  async updateCoverImage(id: number, profile: string) {
    return await this.userRepository.update({ id }, { cover_image: profile });
  }
}
export default new ImageService();
