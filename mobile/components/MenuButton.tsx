import { useState } from "react";
import { StyleSheet, Switch, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { useTheme } from "../theme/utils";

interface MenuButtonProps {
  onPress?: () => void;
  buttonValues: {
    name: string;
    type: string;
    value: boolean;
  };
}

export default function MenuButton({ onPress, buttonValues }: MenuButtonProps) {
  const [isEnabled, setIsEnabled] = useState(buttonValues.value);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          { backgroundColor: theme.colors.elevation.level1 },
          styles.WholeButton,
        ]}
      >
        <Text style={styles.ButtonText}>{buttonValues.name}</Text>
        {buttonValues.type === "switch" ? (
          <Switch onValueChange={toggleSwitch} value={isEnabled} />
        ) : buttonValues.type === "time" ? (
          <Text>"TIME"</Text>
        ) : (
          <Text>nic</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

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
