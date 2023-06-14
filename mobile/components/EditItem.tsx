import { Button, useTheme } from "react-native-paper";
import { View, Text } from "./Themed";
import { StyleSheet, Image } from "react-native";
// const theme = useTheme();

interface EditItemProps {
    eatItem: (id: number) => (void);
    id: number;
  }

export default function EditItem({eatItem, id}: EditItemProps) {
    const theme = useTheme();
  const checkedColor = theme.colors.background;
  
  return (
    <View style={[styles.options, {backgroundColor: "transparent"}]}>
      <Button
        icon="food-drumstick-outline"
        mode="contained"
        onPress={() => eatItem(id)}
      >
        Eat
      </Button>
      <Button
        icon="pencil"
        mode="contained"
        onPress={() => console.log("edit")}
      >
        Edit
      </Button>

      <Button
        icon="delete-outline"
        mode="contained"
        onPress={() => console.log("throw")}
      >
        Throw away
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  options: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    height: 80,
    // height: "100%",
  },
});
