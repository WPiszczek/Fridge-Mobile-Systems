import { StyleSheet } from "react-native";
import { View } from "./Themed";
import MenuButton from "./MenuButton";
import { useLogout } from "../api/services/auth";

export default function MenuScreen() {
  const { mutate: logout } = useLogout();

  return (
    <View style={styles.container}>
      <MenuButton
        buttonValues={{ name: "Tryb nocny", type: "switch", value: false }}
      />
      <MenuButton
        buttonValues={{ name: "Powiadomienia", type: "switch", value: false }}
      />
      <MenuButton
        buttonValues={{ name: "Godzina", type: "time", value: false }}
      />
      <MenuButton
        buttonValues={{ name: "Statystyki", type: "icon", value: false }}
      />
      <MenuButton
        onPress={() => logout()}
        buttonValues={{ name: "Wyloguj", type: "logout", value: false }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    paddingVertical: 40,
    width: "100%",
  },
  button: {},
});
