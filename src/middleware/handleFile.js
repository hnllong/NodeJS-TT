import multer from "multer";
import { environment } from "../config/index.js";
import { GridFsStorage } from "multer-gridfs-storage";

const storage = new GridFsStorage({
  url: `mongodb+srv://${environment.mongo_db.user}:${environment.mongo_db.password}@cluster0.tdbxe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-${file.originalname}`;
      return filename;
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-${file.originalname}`,
    };
  },
});

export default multer({ storage });
