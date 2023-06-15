import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { View, Text } from "../../../../components/Themed";
import { useOpenFoodFactsProduct } from "../../../../api/services/openFoodFacts";
import { useForm } from "react-hook-form";
import {
  CreateProduct,
  useProduct,
  useUpdateProduct,
} from "../../../../api/services/product";
import { useEffect, useState } from "react";
import { CreateTag, useTags } from "../../../../api/services/tags";
import { ScrollView, StyleSheet, Image } from "react-native";
import { PaperFormInput } from "../../../../components/PaperFormInput";
import { Button, Chip, TextInput } from "react-native-paper";
import { PaperDateInput } from "../../../../components/PaperDateInput";
import { queryClient } from "../../../../api/clients";

export default function EditProduct() {
  const navigation = useNavigation();
  const router = useRouter();
  const { id, barcode: barcodeParams } = useLocalSearchParams<{
    id: string;
    barcode: string;
  }>();
  const barcode = barcodeParams ?? "";

  const { data: product, isFetching } = useProduct(parseInt(id ?? "0") ?? "");

  const { data: offProduct, isFetching: isOffProductFetching } =
    useOpenFoodFactsProduct(barcode, !!product);

  const { control, setValue, handleSubmit, watch } = useForm<CreateProduct>({
    defaultValues: {
      productCode: "",
      productName: "",
      pictureUrl: "",
      status: "exists",
      tags: [],
    },
  });

  useEffect(() => {
    console.log("off product set");
    setValue(
      "productName",
      product?.productName ??
        offProduct?.product_name_pl ??
        offProduct?.product_name ??
        ""
    );
    setValue(
      "pictureUrl",
      product?.pictureUrl ??
        offProduct?.selected_images.front?.display.pl ??
        offProduct?.image_url ??
        ""
    );
  }, [offProduct]);

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

  const { mutate } = useUpdateProduct();

  useEffect(() => {
    if (!product) return;
    console.log("product set");
    // @ts-expect-error
    navigation.setParams({ barcode: product?.productCode ?? "" });
    setValue("productName", product.productName);
    setValue("productCode", product.productCode);
    if (product.expirationDate)
      // @ts-expect-error
      setValue("expirationDate", new Date(product.expirationDate));

    setValue("pictureUrl", product.pictureUrl);
    if (product.tags) setSelectedTags(product.tags.map((tag) => tag.name));
  }, [product]);

  return (
    <ScrollView>
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
        ) : offProduct ? (
          <Text>No image available</Text>
        ) : (
          barcode && barcode !== "" && <Text>Product not found</Text>
        )}

        <PaperFormInput
          control={control}
          name="productName"
          label="Product name"
          disabled={isOffProductFetching}
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
            async (data) => {
              if (selectedTags.length === 0) {
                console.error("You need to select at least one tag");
                return;
              }
              // @ts-expect-error
              await mutate({
                ...product,
                ...data,
              });
              queryClient.invalidateQueries(["products"]);
              router.push("/products");
            },
            () => console.log("error")
          )}
        >
          Update product
        </Button>
      </View>
    </ScrollView>
  );
}

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
