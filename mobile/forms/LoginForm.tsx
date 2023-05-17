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
    let res;
    try {
      res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(formData),
      });
    } catch (e) {
      console.error("2" + e);
    }
    const data = await res?.json();

    Alert.alert(data?.status, data?.message);
    let res2;
    try {
      res2 = await fetch("http://localhost:8000/api/me", {
        method: "GET",
        credentials: "include",
      });
    } catch (e) {
      console.error("1" + JSON.stringify(e));
    }
    const data2 = await res2?.json();

    Alert.alert(data2?.status, JSON.stringify(data2, null, 2));
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
