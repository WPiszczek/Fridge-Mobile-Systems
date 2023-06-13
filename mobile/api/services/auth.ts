import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-root-toast";
import { apiClient, queryClient } from "../clients";

export interface RegisterFormValues {
  login: string;
  email: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  pictureUrl?: string;
}

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: async (data: RegisterFormValues) =>
      await apiClient.post("/auth/register", data),
    onSuccess: () => {
      queryClient.resetQueries(["auth"]);
      router.replace("/account");
    },
  });
};

export interface LoginFormValues {
  login: string;
  hashedPassword: string;
}

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: async (data: LoginFormValues) =>
      await apiClient.post("/auth/login", data),
    onSuccess: () => {
      queryClient.resetQueries(["auth"]);
      router.replace("/account");
    },
  });
};

export const useLogout = () =>
  useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => await apiClient.post("/auth/logout"),
    onSuccess: () => {
      queryClient.resetQueries();
      Toast.show("You have successfully logged out!", {
        duration: Toast.durations.SHORT,
      });
    },
  });
