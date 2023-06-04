import { Request, Response } from "express";
import userService from "./user.service";

const me = async (request: Request, response: Response) => {
  const userId = request.session.userId;
  if (!userId) {
    response.status(401).json({
      status: "FAIL",
      message: "Log in to continue."
    });
    return;
  }

  await userService.getUser(userId).then((result) => {
    const [success, userData] = result;
    if (success) {
      response.status(200).json({
        status: "SUCCESS",
        data: userData
      });
    } else {
      response.status(500).json({
        status: "FAIL",
        message: "Error while getting user. Try again."
      });
    }
  });
};

// TODO
const stats = async (request: Request, response: Response) => {};

export default {
  me,
  stats
};
