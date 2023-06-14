import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../clients";

export const useLocalDarkMode = () => {
  const { data } = useQuery({
    queryKey: ["darkMode"],
    initialData: null,
    enabled: false,
  });
  return data;
};

export const setLocalDarkMode = (darkMode: boolean) => {
  queryClient.setQueryData(["darkMode"], darkMode);
};
