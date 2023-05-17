import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Text } from "react-native";
import { FormInput } from "../components/FormInput";
import { apiClient, queryClient } from "../api/clients";
import { useMutation } from "@tanstack/react-query";

interface LoginFormValues {
  login: string;
  hashedPassword: string;
}

export const LoginForm: FC = () => {
  const { control, handleSubmit } = useForm<LoginFormValues>();

  const { mutate: login } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginFormValues) => {
      await apiClient.post("/auth/login", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["me"]);
    },
  });

  return (
    <>
      <Text>Login</Text>
      <FormInput control={control} name="login" placeholder="login" />
      <FormInput
        control={control}
        name="hashedPassword"
        placeholder="password"
        textContentType="password"
        secureTextEntry
      />
      <Button
        onPress={handleSubmit((data) => login(data))}
        title="Login"
        accessibilityLabel="Learn more about this purple button"
      />
    </>
  );
};
