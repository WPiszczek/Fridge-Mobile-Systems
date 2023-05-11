import { FC, PropsWithChildren, useEffect, useState } from "react";
import { TextInput, StyleSheet, View, Pressable, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, useRouter, useSearchParams } from "expo-router";

interface Params {
  [key: string]: string | string[];
  searchQuery: string;
}

export const ProductSearch = () => {
  const router = useRouter();
  const { searchQuery } = useSearchParams<Params>();

  return (
    <View style={styles.view}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name="magnify" size={24} color="#3c3c3c" />
      </View>
      <TextInput
        value={searchQuery}
        onChangeText={(text) => router.setParams({ searchQuery: text })}
        placeholder="Search product"
        style={styles.input}
      />
      <Link
        href={{
          pathname: "/barcodeScanner",
          params: {
            returnTo: "products",
          },
        }}
        asChild
        style={styles.icon}
      >
        <Pressable>
          <MaterialCommunityIcons
            name="barcode-scan"
            size={24}
            color="#3c3c3c"
          />
        </Pressable>
      </Link>
    </View>
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
  view: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 8,

    height: 48,
    paddingHorizontal: 8,
    color: "#3c3c3c",
    backgroundColor: "#efefef",
    borderRadius: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
