import { View, Text, useThemeColor } from "./Themed";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { SegmentedButtons } from "react-native-paper";

interface FilterModalProps {
  item: {
    xD: number;
  };
  filterProducts: (category: string) => void;
}

export default function FilterModal({
  item,
  filterProducts,
}: FilterModalProps) {
  const [value, setValue] = useState("");

  const filter = (val: string) => (event: any) => {
    filterProducts(val);
  };

  const backgroundColor = useThemeColor(
    { light: "#FAFAFA", dark: "#0A0A0A" },
    "background"
  );

  const uncheckedColor = useThemeColor(
    { light: "#0A0A0A", dark: "#FAFAFA" },
    "background"
  );

  return (
    <View style={[{ backgroundColor }, styles.page]}>
      <Text style={styles.catHeader}>Okres przydatności do spożycia</Text>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        style={styles.segButtons}
        buttons={[
          {
            value: "walk",
            label: " < 3",
            uncheckedColor,
            checkedColor: "green",
            onPress: filter("3"),
          },
          {
            value: "train",
            label: " < 5",
            uncheckedColor,
            checkedColor: "green",
            onPress: filter("5"),
          },
          {
            value: "drive",
            label: " all ",
            uncheckedColor,
            checkedColor: "green",
            showSelectedCheck: true,
            onPress: filter("all"),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center",
    // height: "75%",
    borderRadius: 5,
    paddingVertical: 20,
  },
  segButtons: {
    color: "red",
    borderRadius: 50,
    width: "80%",
  },
  catHeader: {
    paddingVertical: 5,
  },
});
