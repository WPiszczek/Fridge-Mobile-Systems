import { useState } from "react";
import { StyleSheet, Switch, TouchableOpacity } from "react-native";
import { useLogout } from "../api/services/auth";
import { useMe } from "../api/services/user";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";

interface MenuButtonProps {
  buttonValues: {
    name: string;
    type: string;
    value: boolean;
  };
}

export default function MenuButton({ buttonValues }: MenuButtonProps) {
  const [isEnabled, setIsEnabled] = useState(buttonValues.value);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const { mutate: logout } = useLogout();
  const { data } = useMe();


  return (
    <TouchableOpacity onPress={ () => logout()}> 
    <View style={styles.WholeButton} >
      <Text style={styles.ButtonText}>{buttonValues.name}</Text>
      {buttonValues.type === "switch" ? (
        <Switch
        trackColor={{false: "#192424", true: "#435F60"}}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      ): (buttonValues.type === "time" ? <Text>"TIME"</Text> : <Text>nic</Text>)}
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
    backgroundColor: "#0A0A0A",
    paddingHorizontal: 10,
    height: 55,
    borderRadius: 8,
  },
  ButtonText: {},
});
