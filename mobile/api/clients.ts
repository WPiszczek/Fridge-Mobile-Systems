import { QueryClient, QueryOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 1000,
  withCredentials: true,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const status = (error as AxiosError).response?.status;
        if (status === 401) {
          return false;
        } else {
          return failureCount <= 3;
        }
      },
    }
  }
});

