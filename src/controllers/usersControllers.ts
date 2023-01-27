import { Response, Request } from "express";
import { ReqItemsTypes } from "../libs/types";
import usersService from "../services/usersService";
import { Path } from "tsoa";

class UsersController {
  async create(req: Request, res: Response) {
    const body: ReqItemsTypes = req.body;
    const user = await usersService.createUser(body);
    try {
      return res.json(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async get(req: Request, res: Response) {
    const users = await usersService.readUsers();
    try {
      return res.json(users);
    } catch (error) {
      throw new Error(error);
    }
  }
  async getUser(@Path() id: number) {
    return usersService.readOneUser(Number(id));
  }
}
export default new UsersController();
