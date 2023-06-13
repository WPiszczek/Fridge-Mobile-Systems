import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

const AccountLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen
      name="login"
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="register"
      options={{
        headerShown: false,
      }}
    />
  </Stack>
);

export default AccountLayout;
