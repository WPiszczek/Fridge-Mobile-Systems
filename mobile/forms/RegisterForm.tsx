import { Text, Button } from "react-native";
import { Input } from "../components/Input";

export const RegisterForm = () => {
  return (
    <>
      <Text>Register</Text>
      <Input placeholder="login" />
      <Input placeholder="password" textContentType="newPassword" />
      <Input placeholder="repeat password" textContentType="newPassword" />
      <Button
        onPress={() => alert("hello")}
        title="Register"
        accessibilityLabel="Learn more about this purple button"
      />
    </>
  );
};
