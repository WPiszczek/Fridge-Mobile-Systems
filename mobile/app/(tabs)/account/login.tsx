import { Button } from "react-native-paper";
import { View } from "../../../components/Themed";
import { LoginForm } from "../../../forms/LoginForm";
import { StyleSheet } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useMe } from "../../../api/services/user";

export default function LoginScreen() {
  const { status } = useMe();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {status === "success" && <Redirect href="/account" />}
      <LoginForm />
      <Button onPress={() => router.push("account/register")}>
        Don't have an account? Sign up!
      </Button>
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
});
