import { useQuery } from "@tanstack/react-query";
import { apiClient, handleError } from "../clients";
import { AxiosError } from "axios";
import { ApiResponse } from "../types";
import { extractData } from "../utils";

export interface Stats {
  eatenCount: string;
  disposedCount: string;
}

export const useStats = () =>
  useQuery({
    queryKey: ["stats"],
    queryFn: () => apiClient.get<ApiResponse<Stats>>("/stats"),
    onError: (error) => {
      if ((error as AxiosError).response?.status !== 401) {
        handleError(error);
      }
    },
    select: (data) => {
      const newData = extractData(data);
      return {
        eatenCount: parseInt(newData.eatenCount),
        disposedCount: parseInt(newData.disposedCount),
      };
    },
  });
