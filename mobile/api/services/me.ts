import { apiClient } from "../clients";

export const getMe = () => apiClient.get("/me")