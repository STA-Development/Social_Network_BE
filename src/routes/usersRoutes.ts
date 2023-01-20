import express from "express";
import usersControllers from "../controllers/usersControllers";
import { loginUserHandler } from "../controllers/authControllers";
import { protect } from "../middleware/auth";

const router = express.Router();

router.get("/all", protect, usersControllers.get);
router.post("/signup", usersControllers.create);
router.post("/login", loginUserHandler);
router.post("/signup/:id", usersControllers.getUser);
export { router };
