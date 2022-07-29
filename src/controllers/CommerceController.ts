import { Request, Response } from "express";

import { CommerceServices } from "../services/CommerceServices";

export class CommerceController {
  public async getAll(req: Request, res: Response) {
    const commerceServices = new CommerceServices();

    const commerces = await commerceServices.getAll();

    return res.json(commerces);
  }

  public async create(req: Request, res: Response) {
    const commerce = req.body;
    const commerceServices = new CommerceServices();

    const newCommerce = await commerceServices.create(commerce);

    return res.json(newCommerce);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const commerceServices = new CommerceServices();

    const commerce = await commerceServices.getByID(id);

    return res.json(commerce);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const commerceServices = new CommerceServices();

    await commerceServices.delete(id);

    return res.end();
  }

  public async update(req: Request, res: Response) {
    const commerce = req.body;
    const { id } = req.params;

    const commerceServices = new CommerceServices();

    const newCommerce = await commerceServices.update(id, commerce);

    return res.json(newCommerce);
  }

  public async search(req: Request, res: Response) {
    const { nationality } = req.query;
    const category = req.query.category
      ? String(req.query.category)
      : undefined;
    const commerceServices = new CommerceServices();

    const commerce = await commerceServices.search(
      String(nationality).toLocaleLowerCase(),
      category
    );

    return res.json(commerce);
  }
}
