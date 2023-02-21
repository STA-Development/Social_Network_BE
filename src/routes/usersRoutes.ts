import express from "express";
import usersControllers from "../controllers/usersControllers";
import LoginController from "../controllers/authControllers";
import { protect } from "../middleware/auth";
import { upload } from "../libs/storage/storage";
import imageControllers from "../controllers/imageControllers";
export const router = express.Router();

router.get("/users", protect, usersControllers.get);
router.post("/signup", usersControllers.create);
router.post("/login", LoginController.loginUser);
router.get("/user", protect, usersControllers.getUser);
router.patch(
  "/profile",
  upload.single("ProfileImg"),
  protect,
  imageControllers.uploadProfileImage
);
router.patch(
  "/cover",
  upload.single("CoverImg"),
  protect,
  imageControllers.uploadCoverImage
);
