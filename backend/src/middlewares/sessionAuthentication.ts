import { Request, Response } from "express";
import session from "express-session";

export const isAuthenticated = (
  request: Request,
  response: Response,
  next: CallableFunction
) => {
  if (request.session.userId) next();
  else
    return response.status(401).json({
      status: "FAIL",
      message: "Log in to continue."
    });
};
