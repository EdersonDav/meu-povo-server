import { Router } from "express";

import { categoryRouter } from "./category.routes";
import { commerceRouter } from "./commerce.routes";

const router = Router();

router.use("/category", categoryRouter);
router.use("/commerce", commerceRouter);

export { router };
