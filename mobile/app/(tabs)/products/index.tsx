import { ScrollView, StyleSheet } from "react-native";
import ListItem from "../../../components/ListItem";
import { ProductSearch } from "../../../components/ProductSearch";
import { Text, View } from "../../../components/Themed";
import { useState, useEffect } from "react";
import { useProducts } from "../../../api/services/product";
import { useRefreshOnFocus } from "../../../lib/useRefreshOnFocus";
import FilterAndSearch from "../../../components/FilterAndSearch";
import { Button, Modal } from "react-native-paper";
import FilterModal from "../../../components/FilterModal";
import SortModal from "../../../components/SortModal";
import { useRouter } from "expo-router";

export default function ProductListScreen() {
  const router = useRouter();

  const [items, setItems] = useState([]);

  const { data, refetch } = useProducts();
  useRefreshOnFocus(refetch);
  console.log("useProducts", data?.data);

  const [visibleFilters, setVisibleFilters] = useState(false);
  const showFilters = () => setVisibleFilters(true);
  const hideFilters = () => setVisibleFilters(false);

  const showFilterAndSort = (which: string) => {
    if (which === "filter") {
      showFilters();
    } else if (which === "sort") {
      showSort();
    }
  };

  const [visibleSort, setVisibleSort] = useState(false);
  const showSort = () => setVisibleSort(true);
  const hideSort = () => setVisibleSort(false);

  const filterProducts = (category: string) => {
    console.log(category);
  };

  const sortProducts = (by: string) => {
    console.log(by);
  };

  const sortDirection = (asc: boolean) => {
    console.log(asc ? "Rosnąco" : "Malejąco");
  };

  return (
    <View style={styles.container}>
      <ProductSearch />
      {items && <FilterAndSearch props={{ showFilterAndSort }} />}
      {data && items.length === 0 && (
        <View style={styles.centeredContainer}>
          <Text>You have no products.</Text>
        </View>
      )}
      {data && items.length > 0 && (
        <ScrollView style={styles.scroll}>
          {items.map((it, index) => (
            <ListItem item={it} key={index} />
          ))}
        </ScrollView>
      )}
      {!data && (
        <View style={styles.centeredContainer}>
          <Button mode="elevated" onPress={() => router.push("/account/login")}>
            Log in, to browse your products
          </Button>
        </View>
      )}
      <Modal
        visible={visibleFilters}
        onDismiss={hideFilters}
        contentContainerStyle={styles.modal}
      >
        <FilterModal item={{ xD: 3 }} filterProducts={filterProducts} />
      </Modal>
      <Modal
        visible={visibleSort}
        onDismiss={hideSort}
        contentContainerStyle={styles.modal}
      >
        <SortModal sort={sortProducts} sortasc={sortDirection} />
      </Modal>
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
  },
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {},
});
