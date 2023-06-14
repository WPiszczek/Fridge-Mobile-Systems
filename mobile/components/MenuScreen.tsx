import { StyleSheet, useColorScheme } from "react-native";
import { View } from "./Themed";
import { MenuButton } from "./MenuButton";
import { useLogout } from "../api/services/auth";
import { ActivityIndicator, Button, Switch, Text } from "react-native-paper";
import { useMe } from "../api/services/user";
import { useCallback, useMemo, useState } from "react";
import { setLocalDarkMode, useLocalDarkMode } from "../api/services/misc";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TimePickerModal } from "react-native-paper-dates";
import { useStats } from "../api/services/stats";

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
  const { data, isFetching } = useStats();

  const foodWasteRatio = useMemo(() => {
    if (!data) return 0;
    const total = data.disposedCount + data.eatenCount;
    const ratio = data.disposedCount / (total > 0 ? total : 1);
    const ratioPercentage = Math.round(ratio * 1000) / 10; // two decimal places
    return ratioPercentage;
  }, [data]);

  return (
    <MenuButton name="Stats">
      {isFetching ? (
        <ActivityIndicator animating={true} />
      ) : data ? (
        <View
          style={{ backgroundColor: "transparent", alignItems: "flex-end" }}
        >
          <Text>Food waste ratio: {foodWasteRatio}%</Text>
          <Text>
            (disposed {data.disposedCount} products out of{" "}
            {data.eatenCount + data.disposedCount})
          </Text>
        </View>
      ) : (
        <Text style={{ color: "darkred" }}>Error. Try again later.</Text>
      )}
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
