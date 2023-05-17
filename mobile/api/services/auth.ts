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

export const useRegister = () => useMutation({
  mutationKey: ["register"],
  mutationFn: async (data: RegisterFormValues) =>
    await apiClient.post("/auth/register", data)
  ,
  onSuccess: () =>
    queryClient.invalidateQueries(["me"]),
});

export interface LoginFormValues {
  login: string;
  hashedPassword: string;
}

export const useLogin = () => useMutation({
  mutationKey: ["login"],
  mutationFn: async (data: LoginFormValues) =>
    await apiClient.post("/auth/login", data)
  ,
  onSuccess: () =>
    queryClient.invalidateQueries(["me"]),
});

export const useLogout = () => useMutation({
  mutationKey: ["logout"],
  mutationFn: async () => await apiClient.post("/auth/logout"),
  onSuccess: () => {
    queryClient.clear()
    Toast.show("You logged out successfully!", {
      duration: Toast.durations.SHORT,
    });
  },
});