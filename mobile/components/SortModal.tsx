import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";
import { Dispatch, SetStateAction } from "react";
import { Checkbox, Switch } from "react-native-paper";

export interface Sorting {
  sortBy: "none" | "name" | "expirationDate";
  ascending: boolean;
}

interface SortModalProps {
  sorting: Sorting;
  setSorting: Dispatch<SetStateAction<Sorting>>;
}

const sortBys = [
  { label: "None", value: "none" },
  { label: "Name", value: "name" },
  { label: "Days Left", value: "expirationDate" },
];

export default function SortModal({ sorting, setSorting }: SortModalProps) {
  const handleSortByChange = (value: string) => {
    setSorting((sorting) => ({
      ...sorting,
      sortBy: value as Sorting["sortBy"],
    }));
  };

  const handleAscendingToggle = (value: boolean) => {
    setSorting((sorting) => ({
      ...sorting,
      ascending: value,
    }));
  };

  return (
    <View style={styles.page}>
      <Text style={styles.catHeader}>Sort by</Text>
      {sortBys.map((sortBy) => (
        <Checkbox.Item
          key={sortBy.value}
          style={styles.checkboxItem}
          label={sortBy.label}
          status={sorting.sortBy === sortBy.value ? "checked" : "unchecked"}
          onPress={() => handleSortByChange(sortBy.value)}
        />
      ))}
      <Text style={styles.catHeader}>Sort ascending</Text>
      <Switch value={sorting.ascending} onValueChange={handleAscendingToggle} />
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
