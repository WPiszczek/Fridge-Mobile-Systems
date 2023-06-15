import { useQuery } from "@tanstack/react-query";
import { apiClient, handleError } from "../clients";
import { AxiosError } from "axios";
import { ApiResponse } from "../types";
import { extractData } from "../utils";

interface User {
  login: string;
  email: string;
  firstName: string;
  lastName: string;
  pictureUrl: string;
}

export const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: () => apiClient.get<ApiResponse<User>>("/me"),
    onError: (error) => {
      if ((error as AxiosError).response?.status !== 401) {
        handleError(error);
      }
    },
    select: extractData,
  });
