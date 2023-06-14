import { View, Text, useThemeColor } from "./Themed";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { SegmentedButtons, Checkbox } from "react-native-paper";

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
            onPress: clickPeriod("3"),
          },
          {
            value: "train",
            label: " < 5",
            uncheckedColor,
            checkedColor: "green",
            onPress: clickPeriod("5"),
          },
          {
            value: "drive",
            label: " all ",
            uncheckedColor,
            checkedColor: "green",
            showSelectedCheck: true,
            onPress: clickPeriod("all"),
          },
        ]}
      />
      <Text style={styles.catHeader}>Kategoria</Text>
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
