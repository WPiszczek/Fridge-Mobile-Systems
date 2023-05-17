import { useQuery } from "@tanstack/react-query";
import { apiClient, handleError } from "../clients";
import { AxiosError } from "axios";

export const useMe = () => useQuery({
    queryKey: ["me"],
    queryFn: () => apiClient.get("/me"),
    onError: (error) => {
        if ((error as AxiosError).response?.status !== 401) {
            handleError(error);
        }
    }
})