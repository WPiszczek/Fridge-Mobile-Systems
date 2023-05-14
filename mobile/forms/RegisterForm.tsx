import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Text } from "react-native";
import { FormInput } from "../components/FormInput";

interface RegisterFormValues {
  login: string;
  email: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  pictureUrl?: string;
}

export const RegisterForm = () => {
  const { control, handleSubmit } = useForm<RegisterFormValues>();

  const handleRegister = useCallback(async (formData: RegisterFormValues) => {
    alert(JSON.stringify(formData, null, 2));
  }, []);

  return (
    <>
      <Text>Register</Text>
      <FormInput control={control} name="login" placeholder="login" />
      <FormInput control={control} name="email" placeholder="e-mail" />
      <FormInput
        control={control}
        name="hashedPassword"
        placeholder="password"
        textContentType="newPassword"
        secureTextEntry
      />
      <FormInput control={control} name="firstName" placeholder="first name" />
      <FormInput control={control} name="lastName" placeholder="last name" />
      <Button
        onPress={handleSubmit(handleRegister)}
        title="Register"
        accessibilityLabel="Learn more about this purple button"
      />
    </>
  );
};
