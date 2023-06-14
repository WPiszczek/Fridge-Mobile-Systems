import { BarCodeScannedCallback } from "expo-barcode-scanner";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { BarcodeScanner } from "../../../components/BarcodeScanner";
import { View } from "../../../components/Themed";
import { Button } from "react-native-paper";

export default function BarcodeScannerScreen() {
  const router = useRouter();

  const handleBarCodeScanned: BarCodeScannedCallback = useCallback(
    ({ data }) => router.push(`/scanner/add-product?barcode=${data}`),
    []
  );

  return (
    <View style={styles.container}>
      <BarcodeScanner onBarCodeScanned={handleBarCodeScanned} />
      <Button
        style={styles.addProductButton}
        mode="elevated"
        icon="hamburger-plus"
        onPress={() => router.push("/scanner/add-product")}
      >
        Add manually
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  addProductButton: {
    position: "absolute",
    bottom: 48,
  },
});
