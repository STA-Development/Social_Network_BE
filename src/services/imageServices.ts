import { Users } from "../database/entities/users";
import { Photos } from "../database/entities/photos";
import { dbmsMysql } from "../database/databaseConnect";
import { Repository } from "typeorm/repository/Repository";
import { errorsText } from "../libs/errors/texts";
import { Posts } from "../database/entities/posts";
import fileUpload from "express-fileupload";
import { DeleteResult, UpdateResult } from "typeorm";

class ImageService {
  private userRepository: Repository<Users>;
  private photoRepository: Repository<Photos>;
  private postRepository: Repository<Posts>;

  constructor() {
    this.userRepository = dbmsMysql.getRepository(Users);
    this.photoRepository = dbmsMysql.getRepository(Photos);
    this.postRepository = dbmsMysql.getRepository(Posts);
  }

  async updateProfileImage(id: number, profile: string): Promise<UpdateResult> {
    return await this.userRepository.update({ id }, { profileImage: profile });
  }

  async updateCoverImage(id: number, cover: string): Promise<UpdateResult> {
    return await this.userRepository.update({ id }, { coverImage: cover });
  }

  async createUserPhotos(
    userId: number,
    quotes: string,
    date: string,
    originalName: fileUpload.FileArray[]
  ): Promise<void> {
    const post = await this.postRepository.save({ userId, quotes, date });
    const promises = originalName.map((file) => {
      const fileName = `/userPhotos/${file.filename}`;
      const entity = this.photoRepository.create({
        photo: fileName,
        postId: post.id,
      });
      return this.photoRepository.save(entity);
    });

    await Promise.all(promises);
  }
  async updatePosts(id: number, quotes: string): Promise<UpdateResult> {
    return await this.postRepository.update({ id }, { quotes: quotes });
  }

  async getUserPhotos(postId: number): Promise<Photos[]> {
    try {
      return await this.photoRepository.find({
        where: { postId },
        order: { id: "desc" },
      });
    } catch {
      throw new Error(errorsText.userNotExist);
    }
  }
  async getUserPhotosLimited(postId: number): Promise<Photos[]> {
    try {
      return await this.photoRepository.find({
        where: { postId },
        order: { id: "desc" },
        take: 9,
      });
    } catch {
      throw new Error(errorsText.userNotExist);
    }
  }
  async deleteImage(id: number): Promise<DeleteResult> {
    try {
      return await this.photoRepository.delete({ id });
    } catch {
      throw new Error(errorsText.IdNotFound);
    }
  }
}
export default new ImageService();
