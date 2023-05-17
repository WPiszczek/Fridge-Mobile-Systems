import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { FormInput } from "../../../components/FormInput";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const { barcode } = useLocalSearchParams();

  const { data, error, isLoading } = useQuery(
    ["product", barcode],
    ({ queryKey: [, barcode] }) =>
      axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      )
  );

  const { control } = useForm({ defaultValues: { productCode: barcode } });

  if (isLoading) return <Text>Loading {barcode}...</Text>;

  return (
    <>
      <FormInput
        control={control}
        name="productCode"
        placeholder="product code"
        keyboardType="numeric"
      />
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </>
  );
};

export default AddProduct;
