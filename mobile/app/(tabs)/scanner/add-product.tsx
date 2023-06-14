import { useLocalSearchParams, useNavigation } from "expo-router";
import { StyleSheet, Image } from "react-native";
import { useForm } from "react-hook-form";
import { PaperFormInput } from "../../../components/PaperFormInput";
import React, { useEffect } from "react";
import { View } from "../../../components/Themed";
import { Button, Text } from "react-native-paper";
import { useOpenFoodFactsProduct } from "../../../api/services/openFoodFacts";
import { CreateProduct, useCreateProduct } from "../../../api/services/product";
import { PaperDateInput } from "../../../components/PaperDateInput";

const AddProduct = () => {
  const navigation = useNavigation();
  const { barcode } = useLocalSearchParams<{ barcode: string }>();

  const { data: product, isFetching } = useOpenFoodFactsProduct(barcode);

  const { control, setValue, handleSubmit, watch } = useForm<CreateProduct>({
    defaultValues: {
      productCode: barcode,
      productName: "",
      pictureUrl: "",
      status: "exists",
      tags: [{ name: "food" }],
    },
  });

  useEffect(() => {
    setValue(
      "productName",
      product?.product_name_pl ?? product?.product_name ?? ""
    );
    setValue(
      "pictureUrl",
      product?.selected_images.front?.display.pl ?? product?.image_url ?? ""
    );
  }, [product]);

  const pictureUrl = watch("pictureUrl");

  const { mutate } = useCreateProduct();

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
      {pictureUrl ? (
        <Image
          style={styles.image}
          source={{
            uri: pictureUrl,
          }}
        />
      ) : product ? (
        <Text>No image available</Text>
      ) : (
        <Text>Product not found</Text>
      )}

      <PaperFormInput
        control={control}
        name="productName"
        label="Product name"
        disabled={isFetching}
      />
      <PaperDateInput
        control={control}
        name="expirationDate"
        label="Expiration date"
      />
      <Text style={{ color: "red" }}>TODO TAGS HERE</Text>
      <Button
        mode="contained"
        onPress={handleSubmit(
          (data) => {
            mutate(data);
          },
          () => console.log("error")
        )}
      >
        Add
      </Button>
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
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
});

export default AddProduct;
