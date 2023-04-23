import { Request, Response } from "express";
import authService from "../services/auth.service";

const login = async (request: Request, response: Response) => {
  const login = request.body.login;
  const hashedPassword = request.body.hashedPassword;

  await authService
    .login({ login, hashedPassword })
    .then((result) => {
      const [success, userId] = result;

      request.session.regenerate((err) => {
        if (err) console.error(err);
        request.session.userId = userId;

        request.session.save((err) => {
          if (err) console.error(err);
          if (success) {
            response.status(200).json({
              status: "SUCCESS",
              message: "Successful login."
            });
          } else {
            response.status(401).json({
              status: "FAIL",
              message: "Invalid login and/or password."
            });
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error while login.");
      console.error(error.message);
      response.status(500).json({
        status: "FAIL",
        message: "Error while login. Try again."
      });
    });
};

const logout = async (request: Request, response: Response) => {
  request.session.regenerate((err) => {
    if (err) console.error(err);
    request.session.userId = null;

    request.session.save((err) => {
      if (err) {
        response.status(500).json({
          status: "FAIL",
          message: "Error while logout. Try again"
        });
      } else {
        response.status(200).json({
          status: "SUCCESS",
          message: "Successful logout."
        });
      }
    });
  });
};

const register = async (request: Request, response: Response) => {
  const login: string = request.body.login;
  const email: string = request.body.email;
  const hashedPassword: string = request.body.hashedPassword;
  const firstName: string = request.body.firstName ?? null;
  const lastName: string = request.body.firstName ?? null;
  const pictureUrl: string = request.body.firstName ?? null;

  await authService
    .register({
      login,
      email,
      hashedPassword,
      firstName,
      lastName,
      pictureUrl
    })
    .then((result) => {
      const [success, userId] = result;

      request.session.regenerate((err) => {
        if (err) console.error(err);
        request.session.userId = userId;

        request.session.save((err) => {
          if (err) console.error(err);
          if (success) {
            response.status(201).json({
              status: "SUCCESS",
              message: "Successful registration."
            });
          } else {
            response.status(500).json({
              status: "FAIL",
              message: "Error while registering. Try again."
            });
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error while register.");
      console.error(error.message);
      if (error.message.includes("users_login_key")) {
        response.status(409).json({
          status: "FAIL",
          message: "Given login is already used. Try again."
        });
      } else if (error.message.includes("users_email_key")) {
        response.status(409).json({
          status: "FAIL",
          message: "Given email is already used. Try again."
        });
      } else {
        response.status(500).json({
          status: "FAIL",
          message: "Error while registering. Try again."
        });
      }
    });
};

// TODO
const loginGoogle = async (request: Request, response: Response) => {
  const token = request.body.token;
  await authService.loginGoogle(token).then((result) => {
    const [name, email, picture] = result;
    // TODO
    // response.json({
    //   status: "SUCCESS",
    //   data: userData
    // });
  });
};

export default {
  login,
  logout,
  register,
  loginGoogle
};
