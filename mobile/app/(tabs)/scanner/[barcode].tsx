import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

const AddProduct = () => {
  const { barcode } = useLocalSearchParams();

  return <Text>{barcode}</Text>;
};

export default AddProduct;
