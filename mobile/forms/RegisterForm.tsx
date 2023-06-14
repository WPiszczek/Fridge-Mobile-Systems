import { useForm } from "react-hook-form";
import { RegisterFormValues, useRegister } from "../api/services/auth";
import { PaperFormInput } from "../components/PaperFormInput";
import { Button, Text } from "react-native-paper";

export const RegisterForm = () => {
  const { control, handleSubmit } = useForm<RegisterFormValues>();

  const { mutate: register, status } = useRegister();

  return (
    <>
      <Text variant="headlineMedium">Register</Text>
      <PaperFormInput control={control} name="login" label="Login" />
      <PaperFormInput control={control} name="email" label="E-mail" />
      <PaperFormInput
        control={control}
        name="hashedPassword"
        label="Password"
        textContentType="newPassword"
        secureTextEntry
      />
      <PaperFormInput
        control={control}
        name="firstName"
        label="First name"
        autoCapitalize="words"
      />
      <PaperFormInput
        control={control}
        name="lastName"
        label="Last name"
        autoCapitalize="words"
      />
      <Button
        onPress={handleSubmit((data) => register(data))}
        accessibilityLabel="Register your account"
        mode="contained"
        loading={status === "loading"}
        disabled={status === "loading" || status === "success"}
      >
        Register
      </Button>
    </>
  );
};
