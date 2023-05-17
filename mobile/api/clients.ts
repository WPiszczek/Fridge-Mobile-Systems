import { QueryClient, QueryOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Toast from "react-native-root-toast";

export const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 1000,
  withCredentials: true,
});

export interface ErrorResponse {
  status: string;
  message: string;
}

export const handleError = (error: unknown) => {
  Toast.show((error as AxiosError<ErrorResponse>).response?.data?.message ?? 'Unknown error occured.', {
    duration: Toast.durations.SHORT,
  });
}

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
      onError: handleError,
    },
    mutations: {
      onError: handleError,
    }
  }
});

