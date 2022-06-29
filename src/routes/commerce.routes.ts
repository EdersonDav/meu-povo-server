import { Router } from "express";

import { CommerceController } from "../controllers/CommerceController";

const commerceRouter = Router();
const commerceController = new CommerceController();

commerceRouter.get("/:id", commerceController.getById);
commerceRouter.put("/:id", commerceController.update);
commerceRouter.delete("/:id", commerceController.delete);
commerceRouter.get("/", commerceController.getAll);
commerceRouter.post("/", commerceController.create);

export { commerceRouter };
