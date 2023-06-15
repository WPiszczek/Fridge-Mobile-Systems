import { IconButton } from "react-native-paper";
import { StyleSheet } from "react-native";
import { View } from "./Themed";
import { useTheme } from "../theme/utils";
import { FC } from "react";

interface FilterAndSearchProps {
  showFilterModal: () => void;
  showSortModal: () => void;
}

export const FilterAndSearch: FC<FilterAndSearchProps> = ({
  showFilterModal,
  showSortModal,
}) => {
  const theme = useTheme();
  const backgroundColor = theme.colors.background;
  const iconColor = theme.colors.text;

  return (
    <View style={styles.page}>
      <IconButton
        icon="filter-menu-outline"
        size={20}
        iconColor={iconColor}
        containerColor={backgroundColor}
        onPress={showFilterModal}
      />
      <IconButton
        icon="sort-alphabetical-ascending"
        size={20}
        iconColor={iconColor}
        containerColor={backgroundColor}
        onPress={showSortModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    width: "100%",
    flexDirection: "row",
  },
});
