import { useColorScheme } from "react-native";
import { CombinedDarkTheme, CombinedDefaultTheme } from "./themes";

export function useTheme() {
  const theme = useColorScheme() === "dark" ? "dark" : "light";

  return {
    light: CombinedDefaultTheme,
    dark: CombinedDarkTheme,
  }[theme];
}

export function useThemeColor({
  light,
  dark,
}: {
  light?: string;
  dark?: string;
}) {
  const theme = useColorScheme() === "dark" ? "dark" : "light";

  return {
    light,
    dark,
  }[theme];
}
