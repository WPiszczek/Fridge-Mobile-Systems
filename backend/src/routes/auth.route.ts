import Express, { Request, Response } from "express";
import authController from "../controllers/auth.controller";
export const authRouter = Express.Router();

authRouter.post("/auth/login", (request: Request, response: Response) => {
  authController.login(request, response);
});

authRouter.post("/auth/register", (request: Request, response: Response) => {
  authController.register(request, response);
});

authRouter.post("/auth/google", (request: Request, response: Response) => {
  authController.loginGoogle(request, response);
});
