import { Router } from "express";

import { CategoryController } from "../controllers/CategoryController";

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.get("/initial", categoryController.getAllCategoriesAndCountries);
categoryRouter.get("/:id", categoryController.getById);
categoryRouter.put("/:id", categoryController.update);
categoryRouter.delete("/:id", categoryController.delete);
categoryRouter.get("/", categoryController.getAll);
categoryRouter.post("/", categoryController.create);

export { categoryRouter };
