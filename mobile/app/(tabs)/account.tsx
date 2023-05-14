import { StyleSheet, Text, Button } from "react-native";

import { Input } from "../../components/Input";
import { View } from "../../components/Themed";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput";
import { LoginForm } from "../../forms/LoginForm";

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <Input placeholder="login" />
      <Input placeholder="password" textContentType="newPassword" />
      <Input placeholder="repeat password" textContentType="newPassword" />
      <Button
        onPress={() => alert("hello")}
        title="Register"
        accessibilityLabel="Learn more about this purple button"
      />
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
