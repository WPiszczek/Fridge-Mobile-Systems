import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

interface BarcodeScannerProps {
  onBarCodeScanned: BarCodeScannedCallback;
}

export const BarcodeScanner = ({ onBarCodeScanned }: BarcodeScannerProps) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <BarCodeScanner
      barCodeTypes={[
        BarCodeScanner.Constants.BarCodeType.ean8,
        BarCodeScanner.Constants.BarCodeType.ean13,
      ]}
      onBarCodeScanned={onBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    />
  );
};
