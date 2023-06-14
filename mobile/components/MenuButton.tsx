import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { useTheme } from "../theme/utils";
import { FC, PropsWithChildren } from "react";

interface MenuButtonProps {
  name: string;
  onPress?: () => void;
}

export const MenuButton: FC<PropsWithChildren<MenuButtonProps>> = ({
  onPress,
  name,
  children,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View
        style={[
          { backgroundColor: theme.colors.elevation.level1 },
          styles.WholeButton,
        ]}
      >
        <Text style={styles.ButtonText}>{name}</Text>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  WholeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    height: 55,
    borderRadius: 8,
  },
  ButtonText: {},
});
