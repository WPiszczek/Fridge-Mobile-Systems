import { IconButton } from "react-native-paper";
import { StyleSheet } from "react-native";
import { View } from "./Themed";
import { useTheme, useThemeColor } from "../theme/utils";

interface FilterAndSearchProps {
  props: {
    showFilterAndSort: (which: string) => void;
  };
}

export default function FilterAndSearch({ props }: FilterAndSearchProps) {
  const showModal = (which: string) => {
    props.showFilterAndSort(which);
  };
  const theme = useTheme();
  const backgroundColor = theme.colors.background;
  const iconColor = theme.colors.text;

  return (
    <View style={styles.page}>
      <IconButton
        icon="filter-menu-outline"
        size={20}
        onPress={() => showModal("filter")}
        iconColor={iconColor}
        containerColor={backgroundColor}
      />
      <IconButton
        icon="sort-alphabetical-ascending"
        size={20}
        iconColor={iconColor}
        containerColor={backgroundColor}
        onPress={() => showModal("sort")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: "100%",
    flexDirection: "row",
  },
  iButton: {},
});
