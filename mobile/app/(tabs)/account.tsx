import { StyleSheet, Text, Button } from "react-native";

import { Input } from "../../components/Input";
import { View } from "../../components/Themed";
import { useCallback } from "react";

export default function TabThreeScreen() {
  const handleLogin = useCallback(async () => {
    const res = await fetch("http://localhost:8000/api/products");
    const data = await res.json();
    alert(JSON.stringify(data, null, 2));
  }, []);

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

      <Text>Login</Text>
      <Input placeholder="login" />
      <Input placeholder="password" textContentType="password" />
      <Button
        onPress={handleLogin}
        title="Login"
        accessibilityLabel="Learn more about this purple button"
      />
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
