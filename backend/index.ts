import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const host_url = process.env.HOST_URL;

app.get("/", (request: Request, response: Response) => {
  response.send("ok");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at ${host_url}:${port}`);
});
