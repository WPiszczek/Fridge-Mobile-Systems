import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";
import { useState, Dispatch, SetStateAction } from "react";
import { Checkbox, SegmentedButtons, Switch } from "react-native-paper";

interface SortModalProps {
  sort: (category: string, asc: boolean) => void;
  asc: boolean;
  setAsc: Dispatch<SetStateAction<boolean>>;
}

export default function SortModal({ sort, asc, setAsc }: SortModalProps) {
  const [sortValue, setSortValue] = useState("name");
  const [sortType, setSortType] = useState([
    { label: "Name", value: "name", checked: false },
    { label: "Days Left", value: "expirationdate", checked: false },
  ]);

  const checkboxHandler = (value: string, index: number) => {
    setSortValue(value);
    sort(value, asc);
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

  const onToggleSwitch = () => {
    sort(sortValue, !asc);
    setAsc(!asc);
  };

  return (
    <View style={styles.page}>
      <Text style={styles.catHeader}>Sort by</Text>
      {sortType.map((checkbox, i) => (
        <Checkbox.Item
          style={styles.checkboxItem}
          label={checkbox.label}
          status={checkbox.checked ? "checked" : "unchecked"}
          onPress={() => checkboxHandler(checkbox.value, i)}
          key={i}
        />
      ))}
      <Text style={styles.catHeader}>Sort ascending</Text>
      <Switch value={asc} onValueChange={onToggleSwitch} />
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxItem: {
    width: "100%",
  },
  page: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 20,
  },
  catHeader: {
    paddingVertical: 5,
    fontSize: 15,
  },
});
