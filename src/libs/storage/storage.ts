import multer from "multer";
import { Request } from "express";
import { currentDate } from "../errors/texts";
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req: Request, file, cb) => {
    const [name, extension] = file.originalname.split(".");
    const fileName = `${currentDate}_${name}.${extension}`;
    cb(null, fileName);
  },
});
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg  and jpeg format allowed"));
    }
  },
});
