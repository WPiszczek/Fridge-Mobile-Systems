import { StyleSheet, useColorScheme } from "react-native";
import { View } from "./Themed";
import { MenuButton } from "./MenuButton";
import { useLogout } from "../api/services/auth";
import { ActivityIndicator, Button, Switch, Text } from "react-native-paper";
import { useMe } from "../api/services/user";
import { parse } from "date-fns";
import { Product, EAN } from "../api/services/product";
import {
  useCallback,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useProducts} from "../api/services/product";
import { setLocalDarkMode, useLocalDarkMode } from "../api/services/misc";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TimePickerModal } from "react-native-paper-dates";
import { useStats } from "../api/services/stats";
import * as Notifications from "expo-notifications";

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

export async function requestPermissionsAsync() {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const getShortPeriodProducts = (data: Product[] | undefined) => {
  if(data){
    let weekFromNow = new Date(new Date().setDate(new Date().getDate() + 7));
    let shortPeriod = data.filter(el => weekFromNow >  new Date(el.expirationDate ?? "9999-12-31")).map(el => el.productName);
    return `Products you should eat in this week: ${shortPeriod.join(", ")}`
  } else {
    return "Nothing to save!";
  }
}

async function schedulePushNotification(notificationTime: {
  hours: number;
  minutes: number;
}, data: Product[] | undefined) {
  requestPermissionsAsync();
  const settings = await Notifications.getPermissionsAsync();

  let trigger = {
    hour: notificationTime.hours,
    minute: notificationTime.minutes,
    repeats: true,
  };
  getShortPeriodProducts(data);
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Save Your food!",
      body: getShortPeriodProducts(data),
    },
    trigger,
  });
}

const NotificationButton = ({
  data,
  notificationTime,
}: {
  data: Product[] | undefined;
  notificationTime: { hours: number; minutes: number };
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const handlePress = () => {
    schedulePushNotification(notificationTime, data);
  };

  return (
    <MenuButton name="Notifications" onPress={handlePress}>
      <Switch
        onValueChange={(value) => {
          toggleSwitch();
          if (value) {
            schedulePushNotification(notificationTime, data);
          } else {
            Notifications.cancelAllScheduledNotificationsAsync();
          }
        }}
        value={isEnabled}
      />
    </MenuButton>
  );
};

const NotificationHourButton = ({
  setNotificationTime,
  notificationTime,
  data,
}: {
  setNotificationTime: Dispatch<
    SetStateAction<{ hours: number; minutes: number }>
  >;
  notificationTime: { hours: number; minutes: number };
  data: Product[] | undefined;
}) => {
  const [visible, setVisible] = useState(false);
  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  // const [time, setTime] = useState({
  //   minutes: 0,
  //   hours: 0,
  // });

  const onConfirm = useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      Notifications.cancelAllScheduledNotificationsAsync();
      schedulePushNotification({ hours, minutes }, data);
      setNotificationTime({ hours, minutes });
      setVisible(false);
      // console.log({ hours, minutes });
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
            {notificationTime.hours.toString().padStart(2, "0")}:
            {notificationTime.minutes.toString().padStart(2, "0")}
          </Button>
          <TimePickerModal
            visible={visible}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
            hours={notificationTime.hours}
            minutes={notificationTime.minutes}
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
  const [notificationTime, setNotificationTime] = useState({
    hours: 0,
    minutes: 0,
  });
  const { data } = useProducts();
  return (
    <View style={styles.container}>
      <NightModeButton />
      <NotificationButton notificationTime={notificationTime} data={data}/>
      <NotificationHourButton
        notificationTime={notificationTime}
        setNotificationTime={setNotificationTime}
        data={data}
      />
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
