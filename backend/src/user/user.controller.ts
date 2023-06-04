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
const stats = async (request: Request, response: Response) => {
  const userId = request.session.userId;
  const numberOfDays = parseInt(request.params.numberOfDays ?? 30);
  if (!userId) {
    response.status(401).json({
      status: "FAIL",
      message: "Log in to continue."
    });
    return;
  }

  await userService.getUserStats(userId, numberOfDays).then((result) => {
    const [success, statsData] = result;
    if (success) {
      response.status(200).json({
        status: "SUCCESS",
        data: statsData
      });
    } else {
      response.status(500).json({
        status: "FAIL",
        message: "Error while getting stats. Try again."
      });
    }
  });
};

const tags = async (request: Request, response: Response) => {
  const userId = request.session.userId;
  if (!userId) {
    response.status(401).json({
      status: "FAIL",
      message: "Log in to continue."
    });
    return;
  }

  await userService.getTags().then((result) => {
    const [success, tagsData] = result;
    if (success) {
      response.status(200).json({
        status: "SUCCESS",
        data: tagsData
      });
    } else {
      response.status(500).json({
        status: "FAIL",
        message: "Error while getting tags. Try again."
      });
    }
  });
};

export default {
  me,
  stats,
  tags
};
