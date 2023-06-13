import { useState } from "react";
import { StyleSheet, Switch, TouchableOpacity } from "react-native";
import { Text, View, useThemeColor } from "../components/Themed";

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

  const backgroundColor = useThemeColor(
    { light: "#FAFAFA", dark: "#0A0A0A" },
    "background"
  );

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[{ backgroundColor }, styles.WholeButton]}>
        <Text style={styles.ButtonText}>{buttonValues.name}</Text>
        {buttonValues.type === "switch" ? (
          <Switch
            trackColor={{ false: "#192424", true: "#435F60" }}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
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
    // padding: 20,
    paddingHorizontal: 10,
    height: 55,
    borderRadius: 8,
  },
  ButtonText: {},
});
