import { StyleSheet } from "react-native";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { ProductSearch } from "../../components/ProductSearch";
import ListItem from "../../components/ListItem";

export default function ProductListScreen() {
  return (
    <View style={styles.container}>
      <ProductSearch />
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <ListItem />
      {/* <EditScreenInfo path="app/(tabs)/products.tsx" /> */}
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
