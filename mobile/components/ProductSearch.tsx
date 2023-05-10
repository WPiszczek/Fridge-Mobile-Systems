import { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ProductSearch = () => {
  const [query, setQuery] = useState("");

  return (
    <View style={styles.view}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name="magnify" size={24} color="#3c3c3c" />
      </View>
      <TextInput
        value={query}
        onChangeText={(text) => setQuery(text)}
        placeholder="Search product"
        style={styles.input}
      />
      <View style={styles.icon}>
        <MaterialCommunityIcons name="barcode-scan" size={24} color="#3c3c3c" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  view: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 8,

    height: 48,
    paddingHorizontal: 16,
    color: "#3c3c3c",
    backgroundColor: "#efefef",
    borderRadius: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
