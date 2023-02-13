import { Response, Request } from "express";
import { Users } from "../database/entities/users";
import { Repository } from "typeorm/repository/Repository";
import { connectDB } from "../database/databaseConnect";
import ImageServices from "../services/imageServices";
//import usersService from "../services/usersService";

class ImageControllers {
  private userRepository: Repository<Users>;

  constructor() {
    this.userRepository = connectDB.getRepository(Users);
  }
  async uploadImage(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      const profileName = req.file?.originalname || "No profile image";
      const profile = await ImageServices.updateImage(id, profileName);
      return res.json(profile);
    } catch (error) {
      throw new Error(error);
    }
  }
  async getUserProfile(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const users = await ImageServices.getUserProfile(id);
      return res.json(users);
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new ImageControllers();
