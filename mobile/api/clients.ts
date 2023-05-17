import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 1000,
  withCredentials: true,
});

export const queryClient = new QueryClient();

