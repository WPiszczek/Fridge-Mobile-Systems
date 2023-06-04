import Express, { Request, Response } from "express";
import authController from "./auth.controller";
export const authRouter = Express.Router();

authRouter.post("/auth/login", (request: Request, response: Response) => {
  console.log("POST /auth/login");
  authController.login(request, response);
});

authRouter.post("/auth/logout", (request: Request, response: Response) => {
  console.log("POST /auth/logout");
  authController.logout(request, response);
});

authRouter.post("/auth/register", (request: Request, response: Response) => {
  console.log("POST /auth/register");
  authController.register(request, response);
});

authRouter.post("/auth/google", (request: Request, response: Response) => {
  console.log("POST /auth/google");
  authController.loginGoogle(request, response);
});
