import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import merge from "deepmerge";

const GreenDefaultColors = {
  primary: "rgb(16, 109, 32)",
  onPrimary: "rgb(255, 255, 255)",
  primaryContainer: "rgb(157, 248, 152)",
  onPrimaryContainer: "rgb(0, 34, 4)",
  secondary: "rgb(82, 99, 79)",
  onSecondary: "rgb(255, 255, 255)",
  secondaryContainer: "rgb(213, 232, 206)",
  onSecondaryContainer: "rgb(17, 31, 15)",
  tertiary: "rgb(56, 101, 106)",
  onTertiary: "rgb(255, 255, 255)",
  tertiaryContainer: "rgb(188, 235, 240)",
  onTertiaryContainer: "rgb(0, 32, 35)",
  error: "rgb(186, 26, 26)",
  onError: "rgb(255, 255, 255)",
  errorContainer: "rgb(255, 218, 214)",
  onErrorContainer: "rgb(65, 0, 2)",
  background: "rgb(252, 253, 246)",
  onBackground: "rgb(26, 28, 25)",
  surface: "rgb(252, 253, 246)",
  onSurface: "rgb(26, 28, 25)",
  surfaceVariant: "rgb(222, 229, 216)",
  onSurfaceVariant: "rgb(66, 73, 64)",
  outline: "rgb(114, 121, 111)",
  outlineVariant: "rgb(194, 201, 189)",
  shadow: "rgb(0, 0, 0)",
  scrim: "rgb(0, 0, 0)",
  inverseSurface: "rgb(47, 49, 45)",
  inverseOnSurface: "rgb(240, 241, 235)",
  inversePrimary: "rgb(130, 219, 126)",
  elevation: {
    level0: "transparent",
    level1: "rgb(240, 246, 235)",
    level2: "rgb(233, 242, 229)",
    level3: "rgb(226, 237, 223)",
    level4: "rgb(224, 236, 220)",
    level5: "rgb(219, 233, 216)",
  },
  surfaceDisabled: "rgba(26, 28, 25, 0.12)",
  onSurfaceDisabled: "rgba(26, 28, 25, 0.38)",
  backdrop: "rgba(44, 50, 42, 0.4)",
};

const GreenDarkColors = {
  primary: "rgb(130, 219, 126)",
  onPrimary: "rgb(0, 57, 10)",
  primaryContainer: "rgb(0, 83, 18)",
  onPrimaryContainer: "rgb(157, 248, 152)",
  secondary: "rgb(186, 204, 179)",
  onSecondary: "rgb(37, 52, 35)",
  secondaryContainer: "rgb(59, 75, 56)",
  onSecondaryContainer: "rgb(213, 232, 206)",
  tertiary: "rgb(160, 207, 212)",
  onTertiary: "rgb(0, 54, 59)",
  tertiaryContainer: "rgb(31, 77, 82)",
  onTertiaryContainer: "rgb(188, 235, 240)",
  error: "rgb(255, 180, 171)",
  onError: "rgb(105, 0, 5)",
  errorContainer: "rgb(147, 0, 10)",
  onErrorContainer: "rgb(255, 180, 171)",
  background: "rgb(26, 28, 25)",
  onBackground: "rgb(226, 227, 221)",
  surface: "rgb(26, 28, 25)",
  onSurface: "rgb(226, 227, 221)",
  surfaceVariant: "rgb(66, 73, 64)",
  onSurfaceVariant: "rgb(194, 201, 189)",
  outline: "rgb(140, 147, 136)",
  outlineVariant: "rgb(66, 73, 64)",
  shadow: "rgb(0, 0, 0)",
  scrim: "rgb(0, 0, 0)",
  inverseSurface: "rgb(226, 227, 221)",
  inverseOnSurface: "rgb(47, 49, 45)",
  inversePrimary: "rgb(16, 109, 32)",
  elevation: {
    level0: "transparent",
    level1: "rgb(31, 38, 30)",
    level2: "rgb(34, 43, 33)",
    level3: "rgb(37, 49, 36)",
    level4: "rgb(39, 51, 37)",
    level5: "rgb(41, 55, 39)",
  },
  surfaceDisabled: "rgba(226, 227, 221, 0.12)",
  onSurfaceDisabled: "rgba(226, 227, 221, 0.38)",
  backdrop: "rgba(44, 50, 42, 0.4)",
};

export const MD3GreenLight = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...GreenDefaultColors,
  },
};

const MD3GreenDark = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...GreenDarkColors,
  },
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
  materialLight: MD3GreenLight,
  materialDark: MD3GreenDark,
});

export const CombinedDefaultTheme = merge(MD3GreenLight, LightTheme);
export const CombinedDarkTheme = merge(MD3GreenDark, DarkTheme);
