import { Request, Response } from "express";

import { CategoryServices } from "../services/CategoryService";

export class CategoryController {
  // eslint-disable-next-line consistent-return
  public async getAll(req: Request, res: Response) {
    const categoryServices = new CategoryServices();

    const categories = await categoryServices.getAll();

    return res.json(categories);
  }

  public async create(req: Request, res: Response) {
    const category = req.body;
    const categoryServices = new CategoryServices();

    const newCategory = await categoryServices.create(category);

    return res.json(newCategory);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const categoryServices = new CategoryServices();

    const category = await categoryServices.getByID(id);

    return res.json(category);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const categoryServices = new CategoryServices();

    await categoryServices.delete(id);

    return res.end();
  }

  public async update(req: Request, res: Response) {
    const category = req.body;
    const { id } = req.params;

    const categoryServices = new CategoryServices();

    const newCategory = await categoryServices.update(id, category);

    return res.json(newCategory);
  }
}
