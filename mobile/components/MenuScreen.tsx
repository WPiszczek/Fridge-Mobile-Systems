import { StyleSheet, useColorScheme } from "react-native";
import { View } from "./Themed";
import { MenuButton } from "./MenuButton";
import { useLogout } from "../api/services/auth";
import { Switch, Text } from "react-native-paper";
import { useMe } from "../api/services/user";
import { useState } from "react";
import { setLocalDarkMode, useLocalDarkMode } from "../api/services/misc";

const NightModeButton = () => {
  const systemDarkMode = useColorScheme() === "dark";
  const localDarkMode = useLocalDarkMode();

  return (
    <MenuButton name="Tryb nocny">
      <Switch
        onValueChange={setLocalDarkMode}
        value={localDarkMode ?? systemDarkMode}
      />
    </MenuButton>
  );
};

const NotificationButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <MenuButton name="Powiadomienia">
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </MenuButton>
  );
};

const NotificationHourButton = () => {
  return (
    <MenuButton name="Godzina">
      <Text>TODO</Text>
    </MenuButton>
  );
};

const StatisticsButton = () => {
  return (
    <MenuButton name="Statystyki">
      <Text>TODO</Text>
    </MenuButton>
  );
};

const LogoutButton = () => {
  const { mutate: logout } = useLogout();
  const { data } = useMe();

  const nameSurname = [data?.firstName, data?.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <MenuButton onPress={() => logout()} name="Wyloguj">
      <Text>{nameSurname}</Text>
    </MenuButton>
  );
};

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <NightModeButton />
      <NotificationButton />
      <NotificationHourButton />
      <StatisticsButton />
      <LogoutButton />
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
