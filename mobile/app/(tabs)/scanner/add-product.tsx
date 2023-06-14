import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { FormInput } from "../../../components/FormInput";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const { barcode } = useLocalSearchParams<{ barcode: string }>();

  const { data, error, isLoading, isFetching } = useQuery(
    ["product", barcode],
    ({ queryKey: [, barcode] }) =>
      axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      ),
    {
      enabled: !!barcode && (barcode.length === 8 || barcode.length === 13),
    }
  );

  const { control } = useForm({ defaultValues: { productCode: barcode } });

  // if (isLoading)
  //   return (
  //     <Text>
  //       Loading {barcode}...
  //     </Text>
  //   );

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
