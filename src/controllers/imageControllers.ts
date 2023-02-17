import { Response, Request } from "express";
import { Users } from "../database/entities/users";
import { Repository } from "typeorm/repository/Repository";
import { connectDB } from "../database/databaseConnect";
import ImageServices from "../services/imageServices";

class ImageControllers {
  private userRepository: Repository<Users>;

  constructor() {
    this.userRepository = connectDB.getRepository(Users);
  }
  async uploadProfileImage(req: Request, res: Response) {
    try {
      const id = req.body.id;
      const profileName =
        `public/images/${Date.now()}_${req.file?.originalname}` ||
        "No profile image";
      const profile = await ImageServices.updateProfileImage(id, profileName);
      return res.json(profile);
    } catch (error) {
      throw new Error(error);
    }
  }
  async uploadCoverImage(req: Request, res: Response) {
    try {
      const id = req.body.id;
      const coverName =
        `public/images/${Date.now()}_${req.file?.originalname}` ||
        "No cover image";
      const cover = await ImageServices.updateCoverImage(id, coverName);
      return res.json(cover);
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new ImageControllers();
