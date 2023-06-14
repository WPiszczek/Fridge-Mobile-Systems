import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { SegmentedButtons, Checkbox } from "react-native-paper";
import { useTheme } from "../theme/utils";

interface FilterModalProps {
  item: {
    xD: number;
  };
  filterProducts: (period: string, category: string[]) => void;
}

export default function FilterModal({
  item,
  filterProducts,
}: FilterModalProps) {
  const [categoriesCheckboxes, setCategoriesCheckboxes] = useState([
    { label: "Dairy", value: "dairy", checked: false },
    { label: "Meat", value: "meat", checked: false },
    { label: "Drinks", value: "drinks", checked: false },
    { label: "Warm", value: "warm", checked: false },
  ]);
  const [value, setValue] = useState("");
  const [period, setPeriod] = useState("");

  const clickPeriod = (per: string) => (event: any) => {
    setPeriod(per);
    let categories = categoriesCheckboxes
    .filter((el) => el.checked === true)
    .map((el) => el.value);
    filter(per, categories);
  };

  const filter = (period: string, categories: string[]) => {
    filterProducts(period, categories);
  }
  const checkboxHandler = (val: string) => {
    let categories = categoriesCheckboxes.map((checkbox) => {
        if (checkbox.value === val) {
          const item = {
            ...checkbox,
            checked: !checkbox.checked,
          };
          return item;
        }
        return checkbox;
      });
    setCategoriesCheckboxes(categories);
    filter(period, categories.filter(el => el.checked === true).map(el => el.value));
  };

  const theme = useTheme();
  const checkedColor = theme.colors.primary;

  return (
    <View style={[{ backgroundColor: theme.colors.background }, styles.page]}>
      <Text style={styles.catHeader}>Shelf life</Text>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        style={styles.segButtons}
        buttons={[
          {
            value: "walk",
            label: " < 3",
            checkedColor,
            onPress: clickPeriod("3"),
          },
          {
            value: "train",
            label: " < 5",
            checkedColor,
            onPress: clickPeriod("5"),
          },
          {
            value: "drive",
            label: " all ",
            checkedColor,
            showSelectedCheck: true,
            onPress: clickPeriod("all"),
          },
        ]}
      />
      <Text style={styles.catHeader}>Category</Text>
      {categoriesCheckboxes.map((checkbox, i) => (
        <Checkbox.Item
          style={{ width: "100%" }}
          label={checkbox.label}
          status={checkbox.checked ? "checked" : "unchecked"}
          onPress={() => checkboxHandler(checkbox.value)}
          key={i}
        />
      ))}
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
