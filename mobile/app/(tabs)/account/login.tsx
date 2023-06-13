import { Button } from "react-native-paper";
import { View } from "../../../components/Themed";
import { LoginForm } from "../../../forms/LoginForm";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
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
