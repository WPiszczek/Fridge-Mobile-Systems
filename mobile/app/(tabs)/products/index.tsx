import { ScrollView, StyleSheet } from "react-native";
import ListItem from "../../../components/ListItem";
import { ProductSearch } from "../../../components/ProductSearch";
import { View } from "../../../components/Themed";

export default function ProductListScreen() {
  const items = [
    {
      id: 1,
      userId: 1,
      productCode: 3017620422003,
      pictureUrl: "https://image.ceneostatic.pl/data/products/53886561/f-nutella-krem-czekoladowy-orzechowy-750g.jpg",
      productName: "Nutella",
      expirationDate: "22.05.2023",
      openingDate: "17.05.2023",
      openExpirationDate: "22.05.2023",
      quantity: "400g",
      status: "???",
      userPercentage: "70%",
    },
    {
      id: 1,
      userId: 1,
      productCode: 3017620422003,
      pictureUrl: "https://image.ceneostatic.pl/data/products/53886561/f-nutella-krem-czekoladowy-orzechowy-750g.jpg",
      productName: "Nutella",
      expirationDate: "22.05.2023",
      openingDate: "17.05.2023",
      openExpirationDate: "22.05.2023",
      quantity: "400g",
      status: "???",
      userPercentage: "70%",
    },
  ];
  return (
    <View style={styles.container}>
      <ProductSearch />
      <ScrollView style={styles.scroll}>
        {items.map((it, index) => (
          <ListItem item={it} key={index} />
        ))}
      </ScrollView>
      {/* <ListItem item={item} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 15,
  },
  scroll: {
    width: "100%",
    // position: "relative",
  },
});
