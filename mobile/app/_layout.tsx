import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { queryClient } from "../api/clients";
import { PaperProvider } from "react-native-paper";
import { useTheme } from "../theme/utils";
import { en, registerTranslation } from "react-native-paper-dates";
export { ErrorBoundary } from "expo-router";

registerTranslation("en", en);

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function ThemedApp() {
  const theme = useTheme();
  return (
    <ThemeProvider value={theme}>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  return (
    <RootSiblingParent>
      <QueryClientProvider client={queryClient}>
        <ThemedApp />
      </QueryClientProvider>
    </RootSiblingParent>
  );
}
