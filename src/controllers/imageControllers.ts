import { Response, Request } from "express";
import ImageServices from "../services/imageServices";
import { currentDate } from "../libs/errors/texts";
import fileUpload from "express-fileupload";
import imageServices from "../services/imageServices";

class ImageControllers {
  async uploadProfileImage(req: Request, res: Response) {
    try {
      const profileName = (currentDate: number) => {
        const originalName = req.file?.originalname;
        return `/profiles/${currentDate}_${originalName}`;
      };
      const id = req.body.id;
      const profile = await ImageServices.updateProfileImage(
        id,
        profileName(currentDate)
      );
      return res.json(profile);
    } catch (error) {
      throw new Error(error);
    }
  }

  async uploadCoverImage(req: Request, res: Response) {
    try {
      const coverName = (currentDate: number) => {
        const originalName = req.file?.originalname;
        return `/coverProfile/${currentDate}_${originalName}`;
      };
      const id = req.body.id;
      const cover = await ImageServices.updateCoverImage(
        id,
        coverName(currentDate)
      );
      return res.json(cover);
    } catch (error) {
      throw new Error(error);
    }
  }
  async createPhotos(req: Request, res: Response) {
    try {
      const id = req.body.id;
      const date = req.body.date;
      const quotes = req.body.quotes;
      const originalName = req.files as unknown as fileUpload.FileArray[];
      const post = await ImageServices.createUserPhotos(
        id,
        quotes,
        date,
        originalName
      );
      return res.json(post);
    } catch (error) {
      return res.json({
        msg: error,
        status: 400,
      });
    }
  }
  async updatePosts(req: Request, res: Response) {
    try {
      const id = req.body.id;
      const quotes = req.body.quotes;
      const updatePost = await ImageServices.updatePosts(id, quotes);
      return res.json(updatePost);
    } catch (error) {
      throw new Error(error);
    }
  }
  async getPhotos(req: Request, res: Response) {
    try {
      const postId = req.body.postId;
      const user = await ImageServices.getUserPhotos(postId);
      return res.json(user);
    } catch (error) {
      throw new Error(error);
    }
  }
  async getLimitedPhotos(req: Request, res: Response) {
    try {
      const postId = req.body.postId;
      const user = await ImageServices.getUserPhotosLimited(postId);
      return res.json(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteImage(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const deleteImage = await imageServices.deleteImage(id);
      return res.json(deleteImage);
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new ImageControllers();
