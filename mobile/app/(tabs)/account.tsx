import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import { LoginForm } from "../../forms/LoginForm";
import { RegisterForm } from "../../forms/RegisterForm";

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <RegisterForm />
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
