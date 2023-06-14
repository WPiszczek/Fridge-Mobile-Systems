import { useQuery } from "@tanstack/react-query";
import { apiClient, handleError } from "../clients";
import { AxiosError } from "axios";
import { ApiResponse } from "../types";
import { extractData } from "../utils";

export interface CreateTag {
  id?: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export const useTags = () =>
  useQuery({
    queryKey: ["tags"],
    queryFn: () => apiClient.get<ApiResponse<Tag[]>>("/tags"),
    onError: (error) => {
      if ((error as AxiosError).response?.status !== 401) {
        handleError(error);
      }
    },
    select: extractData,
  });
