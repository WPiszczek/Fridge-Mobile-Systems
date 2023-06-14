import { useLocalSearchParams, useNavigation } from "expo-router";
import { StyleSheet, Image } from "react-native";
import { useForm } from "react-hook-form";
import { PaperFormInput } from "../../../components/PaperFormInput";
import React, { useEffect, useState } from "react";
import { View } from "../../../components/Themed";
import { Button, Chip, Text, TextInput } from "react-native-paper";
import { useOpenFoodFactsProduct } from "../../../api/services/openFoodFacts";
import { CreateProduct, useCreateProduct } from "../../../api/services/product";
import { PaperDateInput } from "../../../components/PaperDateInput";
import { CreateTag, useTags } from "../../../api/services/tags";

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
      tags: [],
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

  const [tagName, setTagName] = useState<string>("");

  const { data: tags } = useTags();
  const [newTags, setNewTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const allTags: CreateTag[] = [
    ...(tags ?? []),
    ...newTags.map((tag) => ({ name: tag })),
  ];

  useEffect(() => {
    setValue(
      "tags",
      allTags.filter((tag) => selectedTags.includes(tag.name))
    );
  }, [selectedTags]);

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
        barcode && barcode !== "" && <Text>Product not found</Text>
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
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
        {allTags?.map(({ id, name }) => (
          <Chip
            key={id + name}
            onPress={() => {
              if (selectedTags.includes(name)) {
                setSelectedTags((tags) => tags.filter((tag) => tag !== name));
              } else {
                setSelectedTags((tags) => [...tags, name]);
              }
            }}
            selected={selectedTags.includes(name)}
            onClose={
              !id
                ? () => {
                    setNewTags((newTags) =>
                      newTags.filter((tag) => tag !== name)
                    );
                  }
                : undefined
            }
          >
            {name}
          </Chip>
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{ flexGrow: 1 }}
          label="Tag name"
          mode="outlined"
          onChangeText={(text) => setTagName(text)}
          value={tagName}
        />
        <Button
          mode="outlined"
          icon="plus"
          style={{ marginTop: 3 }}
          onPress={() => {
            if (tagName === "") return;
            if (allTags?.some((tag) => tag.name === tagName)) return;
            setNewTags((tags) => [...tags, tagName]);
            setSelectedTags((tags) => [...tags, tagName]);
            setTagName("");
          }}
        >
          Add tag
        </Button>
      </View>
      <Button
        mode="contained"
        onPress={handleSubmit(
          (data) => {
            if (selectedTags.length === 0) {
              console.error("You need to select at least one tag");
              return;
            }
            mutate(data);
          },
          () => console.log("error")
        )}
      >
        Add product
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
