import { Request, Response } from "express";
import baseService from "../services/base.service";

const getBaseResponse = async (request: Request, response: Response) => {
  const responseString: string = baseService.getFromService();
  response.status(200).send(responseString);
};

export default {
  getBaseResponse
};
