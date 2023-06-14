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
import { GreenDarkColors, GreenDefaultColors } from "./colors";

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
