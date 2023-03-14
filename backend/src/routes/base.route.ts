import Express, { Request, Response } from "express";
import baseController from "../controllers/base.controller";

export const baseRouter = Express.Router();

baseRouter.get("/", (request: Request, response: Response) => {
  baseController.getBaseResponse(request, response);
});
