import { Router } from "express";

import { SelfEmployedController } from "../controllers/SelfEmployedController";

const selfEmployedRouter = Router();
const selfEmployedController = new SelfEmployedController();

selfEmployedRouter.get("/search", selfEmployedController.search);
selfEmployedRouter.get("/:id", selfEmployedController.getById);
selfEmployedRouter.put("/:id", selfEmployedController.update);
selfEmployedRouter.delete("/:id", selfEmployedController.delete);
selfEmployedRouter.get("/", selfEmployedController.getAll);
selfEmployedRouter.post("/", selfEmployedController.create);

export { selfEmployedRouter };
