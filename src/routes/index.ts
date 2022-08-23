import { Router } from "express";

import { categoryRouter } from "./category.routes";
import { commerceRouter } from "./commerce.routes";
import { imageRouter } from "./images.routes";
import { selfEmployedRouter } from "./selfEmployed.routes";

const router = Router();

router.use("/category", categoryRouter);
router.use("/commerce", commerceRouter);
router.use("/image", imageRouter);
router.use("/self", selfEmployedRouter);

export { router };
