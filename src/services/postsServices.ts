import { Repository } from "typeorm/repository/Repository";
import { DBMS_MYSQL } from "../database/databaseConnect";
import { Posts } from "../database/entities/posts";
import { errorsText } from "../libs/errors/texts";

class PostsService {
  private postsRepository: Repository<Posts>;

  constructor() {
    this.postsRepository = DBMS_MYSQL.getRepository(Posts);
  }
  async createUserPosts(quotes: string, userId: number, createdAt: number) {
    try {
      await this.postsRepository.save({
        quotes,
        userId,
        createdAt,
      });
    } catch (e) {
      throw new Error(e);
    }
  }
  async getUsersPosts(userId: number, take: number) {
    try {
      return await this.postsRepository.find({
        where: { userId },
        order: { id: "DESC" },
        relations: {
          photos: true,
        },
        take: take,
      });
    } catch {
      throw new Error(errorsText.userNotExist);
    }
  }
  async updateUsersPosts(id: number, quotes: string) {
    try {
      return await this.postsRepository.update({ id }, { quotes: quotes });
    } catch {
      throw new Error(errorsText.userNotExist);
    }
  }
}
export default new PostsService();
