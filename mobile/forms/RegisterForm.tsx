import { useForm } from "react-hook-form";
import { RegisterFormValues, useRegister } from "../api/services/auth";
import { PaperFormInput } from "../components/PaperFormInput";
import { Button, Text } from "react-native-paper";

export const RegisterForm = () => {
  const { control, handleSubmit } = useForm<RegisterFormValues>();

  const { mutate: register } = useRegister();

  return (
    <>
      <Text variant="headlineMedium">Register</Text>
      <PaperFormInput control={control} name="login" placeholder="login" />
      <PaperFormInput control={control} name="email" placeholder="e-mail" />
      <PaperFormInput
        control={control}
        name="hashedPassword"
        placeholder="password"
        textContentType="newPassword"
        secureTextEntry
      />
      <PaperFormInput
        control={control}
        name="firstName"
        placeholder="first name"
      />
      <PaperFormInput
        control={control}
        name="lastName"
        placeholder="last name"
      />
      <Button
        onPress={handleSubmit((data) => register(data))}
        accessibilityLabel="Register your account"
        mode="contained"
      >
        Register
      </Button>
    </>
  );
};
