import multer from "multer";
import path from "path";
import { projectRoute } from "../../utils/path.js";

const BookCoverImages = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(projectRoute, "public", "assets", "imgs", "uploads"));
  },
  filename: (req, file, cb) => {
    const Ramdom = Math.random * 10000;
    const fileName = `${Ramdom}-${file.originalname}`;
    cb(null, fileName);
  },
});

export default BookCoverImages;
