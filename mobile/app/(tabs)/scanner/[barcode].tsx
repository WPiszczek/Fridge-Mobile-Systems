import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

const AddProduct = () => {
  const { barcode } = useLocalSearchParams();

  const { data, error, isLoading } = useQuery(
    ["product", barcode],
    ({ queryKey: [, barcode] }) =>
      axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      )
  );

  if (isLoading) return <Text>Loading {barcode}...</Text>;

  return <Text>{JSON.stringify(data, null, 2)}</Text>;
};

export default AddProduct;
