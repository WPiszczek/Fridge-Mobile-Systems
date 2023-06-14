import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Text } from "react-native";
import { useForm } from "react-hook-form";
import { PaperFormInput } from "../../../components/PaperFormInput";
import { useEffect } from "react";

interface Product {
  product?: {
    product_name: string;
  };
}

const AddProduct = () => {
  const navigation = useNavigation();
  const { barcode } = useLocalSearchParams<{ barcode: string }>();

  const { data, error, isLoading, isFetching } = useQuery(
    ["product", barcode],
    ({ queryKey: [, barcode] }) =>
      axios.get<Product>(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      ),
    {
      enabled: !!barcode && (barcode.length === 8 || barcode.length === 13),
      select: (data) => data.data,
    }
  );

  const { control, setValue } = useForm({
    defaultValues: { productCode: barcode, productName: "" },
  });

  useEffect(() => {
    setValue("productName", data?.product?.product_name ?? "");
  }, [data]);

  return (
    <>
      <PaperFormInput
        control={control}
        name="productCode"
        placeholder="product code"
        keyboardType="numeric"
        onChange={(e) => {
          // @ts-expect-error there's no way to type it
          navigation.setParams({ barcode: e.nativeEvent.text });
        }}
      />
      <PaperFormInput
        control={control}
        name="productName"
        placeholder="product name"
      />
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </>
  );
};

export default AddProduct;
