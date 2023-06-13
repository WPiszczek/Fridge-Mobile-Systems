import { IconButton } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Text, View, useThemeColor } from "./Themed";

interface FilterAndSearchProps {
  props: {
    showFilterAndSort: (which: string) => void;
  };
}

export default function FilterAndSearch({ props }: FilterAndSearchProps) {
  const showModal = (which: string) => {
    props.showFilterAndSort(which);
  };

  const backgroundColor = useThemeColor(
    { light: "#FAFAFA", dark: "#0A0A0A" },
    "background"
  );

  return (
    <View style={styles.page}>
      <IconButton
        icon="filter-menu-outline"
        size={20}
        onPress={() => showModal("filter")}
        iconColor={"white"}
        containerColor={backgroundColor}
      />
      <IconButton
        icon="sort-alphabetical-ascending"
        size={20}
        iconColor={"white"}
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
  iButton: {
  },
});
