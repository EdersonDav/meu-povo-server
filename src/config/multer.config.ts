import multer, { Options } from "multer";
import path from "path";

const localPath = path.resolve(__dirname, "..", "tmp", "uploads");
export const multerConfig: Options = {
  dest: localPath,
  storage: multer.diskStorage({
    destination: localPath,
    filename: (req, file, callback) => {
      const { fileName } = req.params;
      const extension =
        file.originalname.split(".")[file.originalname.split(".").length - 1];
      const fullFileName = `${fileName.toLowerCase()}.${extension}`;

      return callback(null, fullFileName);
    },
  }),

  fileFilter: (req, file, callback) => {
    const validTypes = [
      "image/jpeg",
      "image/svg",
      "image/png",
      "image/svg+xml",
    ];
    if (validTypes.includes(file.mimetype)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
};
