import { FC } from "react";
import { useForm } from "react-hook-form";
import { LoginFormValues, useLogin } from "../api/services/auth";
import { PaperFormInput } from "../components/PaperFormInput";
import { Button, Text } from "react-native-paper";

export const LoginForm: FC = () => {
  const { control, handleSubmit } = useForm<LoginFormValues>();

  const { mutate: login, status } = useLogin();

  return (
    <>
      <Text variant="headlineMedium">Login</Text>
      <PaperFormInput control={control} name="login" placeholder="login" />
      <PaperFormInput
        control={control}
        name="hashedPassword"
        placeholder="password"
        textContentType="password"
        secureTextEntry
      />
      <Button
        onPress={handleSubmit((data) => login(data))}
        accessibilityLabel="Login to your account"
        mode="contained"
        loading={status === "loading"}
        disabled={status === "loading" || status === "success"}
      >
        Login
      </Button>
    </>
  );
};
