import { Users } from "../database/entities/users";
import { Photos } from "../database/entities/photos";
import { DBMS_MYSQL } from "../database/databaseConnect";
import { Repository } from "typeorm/repository/Repository";
import { errorsText } from "../libs/errors/texts";
import { Posts } from "../database/entities/posts";
import fileUpload from "express-fileupload";

class ImageService {
  private userRepository: Repository<Users>;
  private photoRepository: Repository<Photos>;
  private postRepository: Repository<Posts>;

  constructor() {
    this.userRepository = DBMS_MYSQL.getRepository(Users);
    this.photoRepository = DBMS_MYSQL.getRepository(Photos);
    this.postRepository = DBMS_MYSQL.getRepository(Posts);
  }

  async updateProfileImage(id: number, profile: string) {
    return await this.userRepository.update({ id }, { profileImage: profile });
  }

  async updateCoverImage(id: number, cover: string) {
    return await this.userRepository.update({ id }, { coverImage: cover });
  }

  async createUserPhotos(
    userId: number,
    quotes: string,
    originalName: fileUpload.FileArray[]
  ): Promise<void> {
    const post = await this.postRepository.save({ userId, quotes });
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
  async updatePosts(id: number, quotes: string) {
    return await this.postRepository.update({ id }, { quotes: quotes });
  }

  async getUserPhotos(postId: number) {
    try {
      return await this.photoRepository.find({
        where: { postId },
        order: { id: "desc" },
      });
    } catch {
      throw new Error(errorsText.userNotExist);
    }
  }
  async getUserPhotosLimited(postId: number) {
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
  async deleteUserPost(id: number) {
    try {
      return (
        (await this.photoRepository.delete({ postId: id })) &&
        (await this.postRepository.delete({ id }))
      );
    } catch {
      throw new Error(errorsText.IdNotFound);
    }
  }
  async deleteImage(postId: number) {
    try {
      const photoId = await this.photoRepository.delete({ postId });
      return photoId && (await this.postRepository.delete({ id: postId }));
    } catch {
      throw new Error(errorsText.IdNotFound);
    }
  }
}
export default new ImageService();
