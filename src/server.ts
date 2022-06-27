import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";

import * as db from "./database";
import { AppError } from "./middlewares/Errors/AppError";

dotenv.config();
db.connect();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App runig on port ${port}`);
});
