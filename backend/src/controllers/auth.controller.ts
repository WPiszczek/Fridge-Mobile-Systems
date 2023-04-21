import { Request, Response } from "express";
import authService from "../services/auth.service";

const logIn = async (request: Request, response: Response) => {
  const login = request.body.login;
  const hashedPassword = request.body.hashedPassword;

  if (!login || !hashedPassword) {
    response.json({
      status: "FAIL",
      message: "No login and/or password."
    });
    return;
  }
  
  await authService
    .login(login, hashedPassword)
    .then((result) => {
      if (result.length > 0) {
        const userData = {
          id: result[0].id,
          login: result[0].login,
          email: result[0].email,
          first_name: result[0].first_name,
          last_name: result[0].last_name,
          picture_url: result[0].picture_url
        };
        response.json({
          status: "SUCCESS",
          data: userData
        });
      } else {
        response.json({
          status: "FAIL",
          message: "Invalid login and/or password."
        });
      }
    })
    .catch((error) => {
      console.error("Error while login.");
      console.error(error.message);
      console.error(error);
      response.json({
        status: "FAIL",
        message: "Error while login. Try again."
      });
    });
};

const loginGoogle = async (request: Request, response: Response) => {
  const token = request.body.token;
  await authService.loginGoogle(token).then((result) => {
    const [name, email, picture] = result;
    // response.json({
    //   status: "SUCCESS",
    //   data: userData
    // });
  });
};

export default {
  logIn,
  loginGoogle
};
