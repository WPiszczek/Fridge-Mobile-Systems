import { AxiosResponse } from "axios";
import { ApiResponse } from "./types";

export const extractData = <T>(response: AxiosResponse<ApiResponse<T>>) => {
  return response.data.data;
};
