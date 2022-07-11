import { Request, Response } from "express";
import multer from "multer";

import { multerConfig } from "../config/multer.config";
import { ImagesService } from "../services/ImagesService";

const multerMiddlewares = multer(multerConfig);

export class ImagesController {
  private readonly imagesService: ImagesService;

  constructor() {
    this.imagesService = new ImagesService();
  }

  // @UseBefore(multerMiddlewares.single("file"))
  public async uploadImage(req: Request, res: Response) {
    try {
      const { file } = req;
      if (!file) {
        throw new Error("Tipo de arquivo inválido");
      }
      const data = await this.imagesService.create(file);
      return res.status(201).json(data);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.imagesService.delete(id);
      return res.status(204).end();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
