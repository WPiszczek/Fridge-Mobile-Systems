import { StyleSheet, Text } from "react-native";
import { useMe } from "../../api/services/user";
import { View } from "../../components/Themed";
import { LoginForm } from "../../forms/LoginForm";
import { RegisterForm } from "../../forms/RegisterForm";
import MenuScreen from "../../components/MenuScreen";

export default function AccountScreen() {
  const { data, status } = useMe();

  return (
    <View style={styles.container}>
      {data && status === "success" ? (
        <MenuScreen />
      ) : (
        <>
          <RegisterForm />
          <LoginForm />
        </>
      )}
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
