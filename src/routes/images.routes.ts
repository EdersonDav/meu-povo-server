import { Router } from "express";
import multer from "multer";

import { multerConfig } from "../config/multer.config";
import { ImagesController } from "../controllers/ImagesController";

const multerMiddlewares = multer(multerConfig);
const imageRouter = Router();
const imageController = new ImagesController();

imageRouter.delete("/:fileName", imageController.delete);
imageRouter.post(
  "/:fileName",
  multerMiddlewares.single("file"),
  imageController.uploadImage
);

export { imageRouter };
