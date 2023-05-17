import { StyleSheet, ScrollView } from "react-native";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { ProductSearch } from "../../components/ProductSearch";
import ListItem from "../../components/ListItem";

export default function ProductListScreen() {
  const items = [
    {
      code: 3017620422003,
      itemName: "Nutella",
      amount: "400g",
      categories: ["Słodycze", "Szafka lewa górna"],
      date: "30.05.2023",
    },
    {
      code: 3017620422003,
      itemName: "Nutella2as",
      amount: "400g",
      categories: ["Słodycze", "Szafka lewa górna"],
      date: "22.05.2023",
    },
    {
      code: 3017620422003,
      itemName: "Nutella3",
      amount: "400g",
      categories: ["Słodycze", "Szafka lewa górna"],
      date: "17.05.2023",
    },
    {
      code: 3017620422003,
      itemName: "Nutella4",
      amount: "400g",
      categories: ["Słodycze", "Szafka lewa górna"],
      date: "21.02.2022",
    },
    {
      code: 3017620422003,
      itemName: "Nutella",
      amount: "400g",
      categories: ["Słodycze", "Szafka lewa górna"],
      date: "17.05.2023",
    },
    {
      code: 3017620422003,
      itemName: "Nutella2as",
      amount: "400g",
      categories: ["Słodycze", "Szafka lewa górna"],
      date: "17.05.2023",
    },
    {
      code: 3017620422003,
      itemName: "Nutella3",
      amount: "400g",
      categories: ["Słodycze", "Szafka lewa górna"],
      date: "17.05.2023",
    },
    {
      code: 3017620422003,
      itemName: "Nutella4",
      amount: "400g",
      categories: ["Słodycze", "Szafka lewa górna"],
      date: "21.02.2022",
    },
  ];
  return (
    <View style={styles.container}>
      <ProductSearch />
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <ScrollView style={styles.scroll}>
        {items.map((it) => (
          <ListItem item={it} />
        ))}
      </ScrollView>
      {/* <ListItem item={item} /> */}
      {/* <EditScreenInfo path="app/(tabs)/products.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    // padding: 15, //TODO - sprawia, ze scrollview jest uciety
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  scroll: {
    // position: "relative",
  },
});
