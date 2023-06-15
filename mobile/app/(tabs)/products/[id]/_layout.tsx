import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

const ItemsLayout = () => (
  <Stack>
    <Stack.Screen
      name="edit"
      options={{
        title: "Edit the product",
        presentation: "modal",
      }}
    />
  </Stack>
);

export default ItemsLayout;
