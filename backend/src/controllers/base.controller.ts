import { Request, Response } from "express";
import service from "../services/base.service";

const getBaseResponse = async (request: Request, response: Response) => {
  const responseString: string = service.getFromService();
  response.send(responseString);
};

export default {
  getBaseResponse
};
