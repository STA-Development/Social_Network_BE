import { Response, Request } from "express";
import PostsServices from "../services/postsServices";
class PostsControllers {
  async createPosts(req: Request, res: Response) {
    try {
      const { id, quotes, createdAt } = req.body;
      const posts = await PostsServices.createUserPosts(quotes, id, createdAt);
      return res.json({ posts, msg: "post is created", status: 200 });
    } catch (error) {
      return res.json({
        msg: "failed to create",
      });
    }
  }
  async getPosts(req: Request, res: Response) {
    try {
      const postId = req.body.postId;
      const take = Number(req.query.take);
      const userPosts = await PostsServices.getUsersPosts(postId, take);
      return res.json(userPosts);
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUserPosts(req: Request, res: Response) {
    try {
      const id = +req.params.id;
      const quotes = req.body.quotes;
      const updatePost = await PostsServices.updateUsersPosts(id, quotes);
      return res.json(updatePost);
    } catch (error) {
      throw Error(error);
    }
  }
}
export default new PostsControllers();
