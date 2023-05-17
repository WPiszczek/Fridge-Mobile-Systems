import { useForm } from "react-hook-form";
import { Button, Text } from "react-native";
import { RegisterFormValues, useRegister } from "../api/services/auth";
import { FormInput } from "../components/FormInput";

export const RegisterForm = () => {
  const { control, handleSubmit } = useForm<RegisterFormValues>();

  const { mutate: register } = useRegister();

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
        onPress={handleSubmit((data) => register(data))}
        title="Register"
        accessibilityLabel="Learn more about this purple button"
      />
    </>
  );
};
