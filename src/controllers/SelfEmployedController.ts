import { Request, Response } from "express";

import { SelfEmployedServices } from "../services/SelfEmployedServices";

export class SelfEmployedController {
  public async getAll(req: Request, res: Response) {
    const selfEmployedServices = new SelfEmployedServices();

    const selfEmployed = await selfEmployedServices.getAll();

    return res.json(selfEmployed);
  }

  public async create(req: Request, res: Response) {
    const selfEmployed = req.body;
    const selfEmployedServices = new SelfEmployedServices();

    const newSelfEmployed = await selfEmployedServices.create(selfEmployed);

    return res.json(newSelfEmployed);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const selfEmployedServices = new SelfEmployedServices();

    const selfEmployed = await selfEmployedServices.getByID(id);

    return res.json(selfEmployed);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const selfEmployedServices = new SelfEmployedServices();

    await selfEmployedServices.delete(id);

    return res.end();
  }

  public async update(req: Request, res: Response) {
    const selfEmployed = req.body;
    const { id } = req.params;

    const selfEmployedServices = new SelfEmployedServices();

    const newSelfEmployed = await selfEmployedServices.update(id, selfEmployed);

    return res.json(newSelfEmployed);
  }

  public async search(req: Request, res: Response) {
    const { nationality } = req.query;
    const category = req.query.category
      ? String(req.query.category)
      : undefined;
    const selfEmployedServices = new SelfEmployedServices();

    const selfEmployed = await selfEmployedServices.search(
      String(nationality).toLocaleLowerCase(),
      category
    );

    return res.json(selfEmployed);
  }
}
