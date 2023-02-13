import express from "express";
import usersControllers from "../controllers/usersControllers";
import LoginController from "../controllers/authControllers";
import { protect } from "../middleware/auth";
import { upload } from "../libs/storage/storage";
import imageControllers from "../controllers/imageControllers";
console.log(upload, 4325);
const router = express.Router();

router.get("/users", protect, usersControllers.get);
router.post("/signup", usersControllers.create);
router.post("/login", LoginController.loginUser);
router.get("/signup/:id", usersControllers.getUser);
router.patch(
  "/profile/images",
  upload.single("ProfileImg"),
  imageControllers.uploadImage
);
router.get("/public/profile/:id/images/", imageControllers.getUserProfile);
export { router };
