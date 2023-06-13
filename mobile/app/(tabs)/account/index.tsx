import { StyleSheet } from "react-native";
import { useMe } from "../../../api/services/user";
import { View } from "../../../components/Themed";
import MenuScreen from "../../../components/MenuScreen";
import { Redirect } from "expo-router";

export default function AccountScreen() {
  const { data, status } = useMe();

  return (
    <View style={styles.container}>
      {status === "error" && <Redirect href="/account/login" />}
      {data && status === "success" && <MenuScreen />}
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
});
