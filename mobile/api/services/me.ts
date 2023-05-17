import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../clients";

export const useMe = () => useQuery({
    queryKey: ["me"],
    queryFn: () => apiClient.get("/me"),
})