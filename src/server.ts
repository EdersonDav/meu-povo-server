import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App runig on port ${port}`);
});
