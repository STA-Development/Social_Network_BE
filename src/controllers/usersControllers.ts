import { Response, Request } from "express";
import { ReqItemsTypes } from "../libs/types";
import usersService from "../services/usersService";
import { Path } from "tsoa";

class UsersController {
  async create(req: Request, res: Response) {
    try {
      const body: ReqItemsTypes = req.body;
      const user = await usersService.createUser(body);
      return res.json(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const users = await usersService.readUsers();
      return res.json(users);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUser(@Path() id: number) {
    return usersService.readOneUser(id);
  }
}
export default new UsersController();
