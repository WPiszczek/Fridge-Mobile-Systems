import { Text as DefaultText, View as DefaultView } from "react-native";
import { useTheme, useThemeColor } from "../theme/utils";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const theme = useTheme();
  const color = useThemeColor({ light: lightColor, dark: darkColor });

  return (
    <DefaultText
      style={[{ color: color ?? theme.colors.text }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const theme = useTheme();
  const bgColor = useThemeColor({ light: lightColor, dark: darkColor });

  return (
    <DefaultView
      style={[{ backgroundColor: bgColor ?? theme.colors.background }, style]}
      {...otherProps}
    />
  );
}
