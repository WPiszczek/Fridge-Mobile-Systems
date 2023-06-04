import Express, { Request, Response } from "express";
import userController from "./user.controller";
import { isAuthenticated } from "../middlewares/sessionAuthentication";
export const userRouter = Express.Router();

userRouter.get(
  "/me",
  isAuthenticated,
  (request: Request, response: Response) => {
    console.log("GET /me");
    userController.me(request, response);
  }
);

userRouter.get(
  "/tags",
  isAuthenticated,
  (request: Request, response: Response) => {
    console.log("GET /tags");
    userController.tags(request, response);
  }
);

userRouter.get(
  "/stats",
  isAuthenticated,
  (request: Request, response: Response) => {
    console.log("GET /stats");
    userController.stats(request, response);
  }
);
