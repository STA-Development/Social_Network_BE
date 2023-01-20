import { ReqItemsTypes } from "../libs/types";
import usersService from "../services/usersService";
import { Users } from "../database/entities/users";
import { Path } from "tsoa";
import { Response, Request } from "express";

class UsersController {
  async create(req: Request, res: Response): Promise<unknown> {
    try {
      const body: ReqItemsTypes = req.body;
      const user = await usersService.createUser(body);
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.json({
        msg: "fail to create",
        status: 400,
      });
    }
  }

  async get(request: Request, response: Response): Promise<unknown> {
    try {
      const users = await usersService.readUsers();
      return response.json(users);
    } catch (error) {
      console.log(error);
      return response.json({
        msg: "fail to create",
        status: 400,
      });
    }
  }
  async getUser(@Path() id: number): Promise<Users | null> {
    return usersService.readOneUser(Number(id));
  }
}
export default new UsersController();
