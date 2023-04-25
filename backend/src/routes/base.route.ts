import Express, { Request, Response } from "express";
import baseController from "../controllers/base.controller";

export const baseRouter = Express.Router();

baseRouter.get("/", (request: Request, response: Response) => {
  console.log("GET /");
  baseController.getBaseResponse(request, response);
});
