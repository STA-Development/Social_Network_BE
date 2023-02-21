import { Response, Request } from "express";
import { UsersTypes } from "../libs/types";
import usersService from "../services/usersService";

class UsersController {
  async create(req: Request, res: Response) {
    try {
      const body: UsersTypes = req.body;
      await usersService.createUser(body);
      return res.json();
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

  async getOneUser(req: Request, res: Response) {
    try {
      const id = req.body.id;
      const user = await usersService.readOneUser(id);
      return res.json(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default new UsersController();
