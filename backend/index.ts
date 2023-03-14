import express, { Express } from "express";
import dotenv from "dotenv";
import { baseRouter } from "./src/routes/base.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const host_url = process.env.HOST_URL;

app.use("/", baseRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at ${host_url}:${port}`);
});
