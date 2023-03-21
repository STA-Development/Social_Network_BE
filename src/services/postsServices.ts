import { Repository } from "typeorm/repository/Repository";
import { DBMS_MYSQL } from "../database/databaseConnect";
import { Posts } from "../database/entities/posts";
import { errorsText } from "../libs/errors/texts";
import { Photos } from "../database/entities/photos";

class PostsService {
  private postsRepository: Repository<Posts>;
  private photoRepository: Repository<Photos>;

  constructor() {
    this.postsRepository = DBMS_MYSQL.getRepository(Posts);
    this.photoRepository = DBMS_MYSQL.getRepository(Photos);
  }
  async createUserPosts(quotes: string, userId: number, date: string) {
    try {
      await this.postsRepository.save({
        quotes,
        userId,
        date,
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
  async deleteUserPost(id: number) {
    try {
      return (
        (await this.photoRepository.delete({ postId: id })) &&
        (await this.postsRepository.delete({ id }))
      );
    } catch {
      throw new Error(errorsText.IdNotFound);
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
