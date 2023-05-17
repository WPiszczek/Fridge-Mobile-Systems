import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button, Text } from "react-native";
import { LoginFormValues, useLogin } from "../api/services/auth";
import { FormInput } from "../components/FormInput";

export const LoginForm: FC = () => {
  const { control, handleSubmit } = useForm<LoginFormValues>();

  const { mutate: login } = useLogin();

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
