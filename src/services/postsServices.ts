import { Repository } from "typeorm/repository/Repository";
import { dbmsMysql } from "../database/databaseConnect";
import { Posts } from "../database/entities/posts";
import { errorsText } from "../libs/errors/texts";
import { Photos } from "../database/entities/photos";
import { DeleteResult, UpdateResult } from "typeorm";

class PostsService {
  private postsRepository: Repository<Posts>;
  private photoRepository: Repository<Photos>;

  constructor() {
    this.postsRepository = dbmsMysql.getRepository(Posts);
    this.photoRepository = dbmsMysql.getRepository(Photos);
  }
  async createUserPosts(
    quotes: string,
    userId: number,
    date: string
  ): Promise<void> {
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
  async getUsersPosts(userId: number, take: number): Promise<Posts[]> {
    try {
      //const postsCount = await this.postsRepository.count();
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
  async deleteUserPost(id: number): Promise<DeleteResult> {
    try {
      return (
        (await this.photoRepository.delete({ postId: id })) &&
        (await this.postsRepository.delete({ id }))
      );
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUsersPosts(id: number, quotes: string): Promise<UpdateResult> {
    try {
      return await this.postsRepository.update({ id }, { quotes: quotes });
    } catch {
      throw new Error(errorsText.userNotExist);
    }
  }
}
export default new PostsService();
