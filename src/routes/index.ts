import { Router } from "express";

import { categoryRouter } from "./category.routes";
import { commerceRouter } from "./commerce.routes";
import { imageRouter } from "./images.routes";

const router = Router();

router.use("/category", categoryRouter);
router.use("/commerce", commerceRouter);
router.use("/image", imageRouter);

export { router };
