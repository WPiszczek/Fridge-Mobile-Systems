import { BarCodeScannedCallback } from "expo-barcode-scanner";
import { useCallback } from "react";
import { StyleSheet } from "react-native";

import { useRouter } from "expo-router";
import { BarcodeScanner } from "../../../components/BarcodeScanner";
import { View } from "../../../components/Themed";

export default function BarcodeScannerScreen() {
  const router = useRouter();

  const handleBarCodeScanned: BarCodeScannedCallback = useCallback(
    ({ data }) => router.push(`/scanner/${data}`),
    []
  );

  return (
    <View style={styles.container}>
      <BarcodeScanner onBarCodeScanned={handleBarCodeScanned} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
