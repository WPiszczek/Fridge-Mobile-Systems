import { StyleSheet, useColorScheme } from "react-native";
import { View } from "./Themed";
import { MenuButton } from "./MenuButton";
import { useLogout } from "../api/services/auth";
import { Button, Switch, Text } from "react-native-paper";
import { useMe } from "../api/services/user";
import { useCallback, useState } from "react";
import { setLocalDarkMode, useLocalDarkMode } from "../api/services/misc";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TimePickerModal } from "react-native-paper-dates";

const NightModeButton = () => {
  const systemDarkMode = useColorScheme() === "dark";
  const localDarkMode = useLocalDarkMode();

  return (
    <MenuButton name="Night mode">
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
    <MenuButton name="Notifications">
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </MenuButton>
  );
};

const NotificationHourButton = () => {
  const [visible, setVisible] = useState(false);
  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const [time, setTime] = useState({
    minutes: 0,
    hours: 0,
  });

  const onConfirm = useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      setTime({ hours, minutes });
      setVisible(false);
      console.log({ hours, minutes });
    },
    [setVisible]
  );

  return (
    <MenuButton name="Notification hour">
      <SafeAreaProvider>
        <View
          style={{
            justifyContent: "center",
            flex: 1,
            alignItems: "flex-end",
            backgroundColor: "transparent",
          }}
        >
          <Button onPress={() => setVisible(true)} uppercase={false}>
            {time.hours.toString().padStart(2, "0")}:
            {time.minutes.toString().padStart(2, "0")}
          </Button>
          <TimePickerModal
            visible={visible}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
            hours={time.hours}
            minutes={time.minutes}
            use24HourClock
          />
        </View>
      </SafeAreaProvider>
    </MenuButton>
  );
};

const StatisticsButton = () => {
  return (
    <MenuButton name="Stats">
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
    <MenuButton onPress={() => logout()} name="Logout">
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
