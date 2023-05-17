import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

const ProductsLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen
      name="product-search-scanner"
      options={{
        title: "Search by scanning the barcode",
        presentation: "modal",
      }}
    />
  </Stack>
);

export default ProductsLayout;
