import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

interface Params {
  [key: string]: string | string[];
  searchQuery: string;
}

export const ProductSearch = () => {
  const router = useRouter();
  const { searchQuery } = useSearchParams<Params>();

  return (
    <TextInput
      value={searchQuery}
      onChangeText={(text) => router.setParams({ searchQuery: text })}
      label="Search product"
      style={styles.searchInput}
      mode="outlined"
      left={
        <TextInput.Icon
          icon={(props) => <MaterialCommunityIcons name="magnify" {...props} />}
          forceTextInputFocus
        />
      }
      right={
        <TextInput.Icon
          icon={(props) => (
            <MaterialCommunityIcons name="barcode-scan" {...props} />
          )}
          onPress={() => router.push("products/product-search-scanner")}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    width: "100%",
  },
});
