import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

const ScannerLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen
      name="add-product"
      options={{
        title: "Add product",
        presentation: "modal",
      }}
    />
  </Stack>
);

export default ScannerLayout;
