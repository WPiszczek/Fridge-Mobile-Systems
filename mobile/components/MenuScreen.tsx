import { Button, StyleSheet, ScrollView } from "react-native";
import { View, Text } from "./Themed";
import MenuButton from "./MenuButton";

export default function MenuScreen() {
  
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
        buttonValues={{ name: "Wyloguj", type: "logout", value: false}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent:"space-around",
    paddingVertical: 40,
    width: "100%",
  },
  button: {},
});
