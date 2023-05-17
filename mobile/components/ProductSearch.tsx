import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, useRouter, useSearchParams } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Input } from "./Input";

interface Params {
  [key: string]: string | string[];
  searchQuery: string;
}

export const ProductSearch = () => {
  const router = useRouter();
  const { searchQuery } = useSearchParams<Params>();

  return (
    <Input
      value={searchQuery}
      onChangeText={(text) => router.setParams({ searchQuery: text })}
      placeholder="Search product"
      before={
        <View style={styles.icon}>
          <MaterialCommunityIcons name="magnify" size={24} color="#3c3c3c" />
        </View>
      }
      after={
        <Link href="products/productSearchScanner" asChild style={styles.icon}>
          <Pressable>
            <MaterialCommunityIcons
              name="barcode-scan"
              size={24}
              color="#3c3c3c"
            />
          </Pressable>
        </Link>
      }
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99,
    aspectRatio: 1,
  },
});
