import { ScrollView, StyleSheet } from "react-native";
import ListItem from "../../../components/ListItem";
import { ProductSearch } from "../../../components/ProductSearch";
import { View } from "../../../components/Themed";

export default function ProductListScreen() {
  const items = [
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
