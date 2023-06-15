import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { SegmentedButtons, Chip } from "react-native-paper";
import { useTheme } from "../theme/utils";
import { useTags } from "../api/services/tags";

export type DaysFilterValues = "3" | "5" | "all";

export interface Filters {
  days: DaysFilterValues;
  tags: string[];
}

interface FilterModalProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}

export const FilterModal: FC<FilterModalProps> = ({ filters, setFilters }) => {
  const { data: tags } = useTags();
  const theme = useTheme();
  const checkedColor = theme.colors.primary;

  return (
    <View style={[{ backgroundColor: theme.colors.background }, styles.page]}>
      <Text style={styles.catHeader}>Shelf life</Text>
      <SegmentedButtons
        value={filters.days}
        onValueChange={(value) => {
          setFilters((filters) => ({
            ...filters,
            days: value as DaysFilterValues,
          }));
        }}
        style={styles.segmentButtons}
        buttons={[
          {
            value: "3",
            label: "< 3",
            checkedColor,
          },
          {
            value: "5",
            label: "< 5",
            checkedColor,
          },
          {
            value: "all",
            label: "all",
            checkedColor,
          },
        ]}
      />
      <Text style={styles.catHeader}>Category</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 10,
          gap: 5,
        }}
      >
        {tags?.map(({ id, name }) => (
          <Chip
            key={id + name}
            onPress={() => {
              if (filters.tags.includes(name)) {
                setFilters((filters) => ({
                  ...filters,
                  tags: filters.tags.filter((tag) => tag !== name),
                }));
              } else {
                setFilters((filters) => ({
                  ...filters,
                  tags: [...filters.tags, name],
                }));
              }
            }}
            selected={filters.tags.includes(name)}
          >
            {name}
          </Chip>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 20,
  },
  segmentButtons: {
    color: "red",
    borderRadius: 50,
    width: "80%",
  },
  catHeader: {
    paddingVertical: 5,
  },
});
