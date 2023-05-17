import { BarCodeScannedCallback } from "expo-barcode-scanner";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { Platform, StyleSheet } from "react-native";
import { BarcodeScanner } from "../../../components/BarcodeScanner";
import { View } from "../../../components/Themed";

export default function ModalScreen() {
  const router = useRouter();

  const handleBarCodeScanned: BarCodeScannedCallback = useCallback(
    ({ data }) => {
      router.replace({
        pathname: "products",
        params: { searchQuery: data },
      });
    },
    []
  );

  return (
    <View style={styles.container}>
      <BarcodeScanner onBarCodeScanned={handleBarCodeScanned} />
      {/* Use a light   status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
