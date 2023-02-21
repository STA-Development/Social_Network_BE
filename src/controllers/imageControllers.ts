import { Response, Request } from "express";
import { Users } from "../database/entities/users";
import { Repository } from "typeorm/repository/Repository";
import { DBMS_MYSQL } from "../database/databaseConnect";
import ImageServices from "../services/imageServices";
import { currentDate } from "../libs/errors/texts";

class ImageControllers {
  private userRepository: Repository<Users>;

  constructor() {
    this.userRepository = DBMS_MYSQL.getRepository(Users);
  }
  async uploadProfileImage(req: Request, res: Response) {
    try {
      const profileName = (currentDate: number) => {
        const originalName = req.file?.originalname;
        return `/images/${currentDate}_${originalName}`;
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
        return `/images/${currentDate}_${originalName}`;
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
}
export default new ImageControllers();
