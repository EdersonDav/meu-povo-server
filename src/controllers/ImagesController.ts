import { Request, Response } from "express";

import { ImagesService } from "../services/ImagesService";

export class ImagesController {
  public async uploadImage(req: Request, res: Response) {
    try {
      const { file } = req;

      if (!file) {
        throw new Error("Tipo de arquivo inválido");
      }
      const imagesService = new ImagesService();
      const data = await imagesService.create(file);
      return res.status(201).json({ url: data });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { fileName } = req.params;
      const imagesService = new ImagesService();
      await imagesService.delete(fileName);
      return res.status(204).end();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
