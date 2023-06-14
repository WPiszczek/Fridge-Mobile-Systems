import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { PaperFormInput } from "../../../components/PaperFormInput";
import React, { useEffect } from "react";
import { DatePickerInput } from "react-native-paper-dates";
import { View } from "../../../components/Themed";
import { Button } from "react-native-paper";

interface Product {
  product?: {
    product_name: string;
  };
}

const AddProduct = () => {
  const navigation = useNavigation();
  const { barcode } = useLocalSearchParams<{ barcode: string }>();

  const { data, isFetching } = useQuery(
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

  const [inputDate, setInputDate] = React.useState<Date | undefined>(undefined);

  return (
    <View style={styles.container}>
      <PaperFormInput
        control={control}
        name="productCode"
        label="Product code"
        placeholder="EAN8 or EAN13"
        keyboardType="numeric"
        onChange={(e) => {
          // @ts-expect-error there's no way to type it
          navigation.setParams({ barcode: e.nativeEvent.text });
        }}
      />
      <PaperFormInput
        control={control}
        name="productName"
        label="Product name"
        disabled={isFetching}
      />
      <View>
        <DatePickerInput
          startYear={2000}
          endYear={2050}
          locale="en"
          mode="outlined"
          label="Expiration date"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          inputMode="start"
        />
      </View>

      <Button mode="contained">Add</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 15,
    gap: 10,
  },
});

export default AddProduct;
