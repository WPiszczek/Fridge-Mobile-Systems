import { View, Text, useThemeColor } from "./Themed";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { Checkbox, SegmentedButtons, Switch } from "react-native-paper";

interface SortModalProps {
  sort: (category: string) => void;
  sortasc: (asc: boolean) => void;
}

export default function SortModal({ sort, sortasc }: SortModalProps) {
  //   const [value, setValue] = useState("");
  const [sortType, setSortType] = useState([
    { label: "Name", value: "name", checked: false },
    { label: "Open Date", value: "opendate", checked: false },
    { label: "Days Left", value: "daysleft", checked: false },
  ]);

  const checkboxHandler = (value: string, index: number) => {
    sort(value);
    const newValue = sortType.map((checkbox, i) => {
      if (i !== index)
        return {
          ...checkbox,
          checked: false,
        };
      if (i === index) {
        const item = {
          ...checkbox,
          checked: !checkbox.checked,
        };
        return item;
      }
      return checkbox;
    });
    setSortType(newValue);
  };

  const [ascendind, setAscending] = useState(true);

  const onToggleSwitch = () => {
    sortasc(!ascendind);
    setAscending(!ascendind);
  };

  return (
    <View style={styles.page}>
      <Text style={styles.catHeader}>Sort by</Text>
      {sortType.map((checkbox, i) => (
        <View style={styles.checkbox}>
          <Text style={styles.checkboxHeader}>{checkbox.label}</Text>
          <Checkbox
            status={checkbox.checked ? "checked" : "unchecked"}
            onPress={() => checkboxHandler(checkbox.value, i)}
          />
        </View>
      ))}
      <Text style={styles.catHeader}>Sort ascending</Text>
      <Switch value={ascendind} onValueChange={onToggleSwitch} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    borderRadius: 5,
    paddingVertical: 20,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxHeader: {
    fontSize: 10,
  },
  catHeader: {
    paddingVertical: 5,
    fontSize: 15,
  },
});
