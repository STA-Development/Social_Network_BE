import express from "express";
import usersControllers from "../controllers/usersControllers";
import LoginController from "../controllers/authControllers";
import { protect } from "../middleware/auth";

const router = express.Router();

router.get("/users", protect, usersControllers.get);
router.post("/signup", usersControllers.create);
router.post("/login", LoginController.loginUser);
router.get("/signup/:id", usersControllers.getUser);
export { router };
