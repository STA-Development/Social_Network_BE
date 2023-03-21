import express from "express";
import usersControllers from "../controllers/usersControllers";
import LoginController from "../controllers/authControllers";
import { protect } from "../middleware/auth";
import { uploadProfile } from "../libs/storage/profileStorage";
import { uploadCover } from "../libs/storage/coverStorage";
import { uploadUserPhoto } from "../libs/storage/userPhotos";
import imageControllers from "../controllers/imageControllers";
import postsControllers from "../controllers/postsControllers";
export const router = express.Router();

router.get("/users", protect, usersControllers.get);
router.post("/signup", usersControllers.create);
router.post("/login", LoginController.loginUser);
router.get("/user", protect, usersControllers.getUser);
router.patch(
  "/profile",
  uploadProfile.single("ProfileImg"),
  protect,
  imageControllers.uploadProfileImage
);
router.patch(
  "/cover",
  uploadCover.single("CoverImg"),
  protect,
  imageControllers.uploadCoverImage
);
router.post(
  "/photos",
  uploadUserPhoto.array("userPhoto", 20),
  protect,
  imageControllers.createPhotos
);
router.get("/limitedPhotos", protect, imageControllers.getLimitedPhotos);
router.delete("/deleted/:id", protect, postsControllers.deletePost);
router.delete("/deletedImage/:id", protect, imageControllers.deleteImage);
router.get("/photo", protect, imageControllers.getPhotos);
router.post("/posts", protect, postsControllers.createPosts);
router.get("/showPosts", protect, postsControllers.getPosts);
router.patch("/updatePost", protect, imageControllers.updatePosts);
router.patch("/updateUserPost/:id", protect, postsControllers.updateUserPosts);
