import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { SegmentedButtons } from "react-native-paper";
import { useTheme } from "../theme/utils";

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

  const theme = useTheme();
  const checkedColor = theme.colors.primary;

  return (
    <View style={[{ backgroundColor: theme.colors.background }, styles.page]}>
      <Text style={styles.catHeader}>Okres przydatności do spożycia</Text>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        style={styles.segButtons}
        buttons={[
          {
            value: "walk",
            label: " < 3",
            checkedColor,
            onPress: filter("3"),
          },
          {
            value: "train",
            label: " < 5",
            checkedColor,
            onPress: filter("5"),
          },
          {
            value: "drive",
            label: " all ",
            checkedColor,
            showSelectedCheck: true,
            onPress: filter("all"),
          },
        ]}
      />
      <Text style={styles.catHeader}>Kategoria</Text>
      {/* TODO dodać kategorie jako checkboxy, bo segment się wywala */}
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
