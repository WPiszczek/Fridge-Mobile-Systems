import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";

export default function BarcodeScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [barCode, setBarCode] = useState<string>();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned: BarCodeScannedCallback = ({ data }) => {
    setBarCode(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        barCodeTypes={[
          BarCodeScanner.Constants.BarCodeType.ean8,
          BarCodeScanner.Constants.BarCodeType.ean13,
        ]}
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {barCode && <Text>{barCode}</Text>}
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
