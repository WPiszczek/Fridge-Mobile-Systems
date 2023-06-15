import { IconButton } from "react-native-paper";
import { StyleSheet } from "react-native";
import { View } from "./Themed";
import { FC } from "react";

interface FilterAndSearchProps {
  areFiltersSet: boolean;
  isSortingSet: boolean;
  showFilterModal: () => void;
  showSortModal: () => void;
}

export const FilterAndSearch: FC<FilterAndSearchProps> = ({
  areFiltersSet,
  isSortingSet,
  showFilterModal,
  showSortModal,
}) => (
  <View style={styles.page}>
    <IconButton
      icon="filter-menu-outline"
      size={24}
      mode={areFiltersSet ? "contained" : "outlined"}
      onPress={showFilterModal}
    />
    <IconButton
      icon="sort-alphabetical-ascending"
      size={24}
      mode={isSortingSet ? "contained" : "outlined"}
      onPress={showSortModal}
    />
  </View>
);

const styles = StyleSheet.create({
  page: {
    width: "100%",
    flexDirection: "row",
  },
});
