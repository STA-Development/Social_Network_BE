import { Users } from "../database/entities/users";
import { DBMS_MYSQL } from "../database/databaseConnect";
import { Repository } from "typeorm/repository/Repository";

class ImageService {
  private userRepository: Repository<Users>;

  constructor() {
    this.userRepository = DBMS_MYSQL.getRepository(Users);
  }

  async updateProfileImage(id: number, profile: string) {
    return await this.userRepository.update({ id }, { profile_image: profile });
  }
  async updateCoverImage(id: number, cover: string) {
    return await this.userRepository.update({ id }, { cover_image: cover });
  }
}
export default new ImageService();
