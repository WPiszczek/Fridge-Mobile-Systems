import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Text } from "react-native";
import { FormInput } from "../components/FormInput";

interface LoginFormValues {
  login: string;
  hashedPassword: string;
}

export const LoginForm: FC = () => {
  const { control, handleSubmit } = useForm<LoginFormValues>();

  const handleLogin = useCallback(async (formData: LoginFormValues) => {
    const res = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    Alert.alert(data.status, data.message);
  }, []);

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
        onPress={handleSubmit(handleLogin)}
        title="Login"
        accessibilityLabel="Learn more about this purple button"
      />
    </>
  );
};
