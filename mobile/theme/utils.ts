import { useColorScheme } from "react-native";
import { CombinedDarkTheme, CombinedDefaultTheme } from "./themes";
import { useLocalDarkMode } from "../api/services/misc";

export function useThemeName() {
  const systemDarkMode = useColorScheme() === "dark";
  const localDarkMode = useLocalDarkMode();
  const themeName = localDarkMode ?? systemDarkMode ? "dark" : "light";
  return themeName;
}

export function useTheme() {
  const theme = useThemeName();

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
  const theme = useThemeName();

  return {
    light,
    dark,
  }[theme];
}
