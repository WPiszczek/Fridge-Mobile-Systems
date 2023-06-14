import { ScrollView, StyleSheet } from "react-native";
import ListItem from "../../../components/ListItem";
import { ProductSearch } from "../../../components/ProductSearch";
import { Text, View } from "../../../components/Themed";
import { useState, useEffect } from "react";
import { useProducts, useUpdateProduct, useDeleteProduct } from "../../../api/services/product";
import { useRefreshOnFocus } from "../../../lib/useRefreshOnFocus";
import FilterAndSearch from "../../../components/FilterAndSearch";
import { Button, Modal } from "react-native-paper";
import FilterModal from "../../../components/FilterModal";
import SortModal from "../../../components/SortModal";
import { useRouter } from "expo-router";
import { parse } from "date-fns";
import { Product, EAN } from "../../../api/services/product";

let maxDate = "9999-99-99";

export default function ProductListScreen() {
  let mock = [
    {id: 1,
      userId: 1,
      productCode: "214143324",
      pictureUrl: "https://kama-konskie.pl/wp-content/uploads/2018/02/nutella_350g.jpg",
      productName: "Nutella1",
      quantity: "400g",
      status: "tak",
      usagePercentage: "70",
      expirationDate: "2023-06-30",
      openingDate: "2023-06-12",
      openExpirationDate: "2023-06-30",
    },
    {id: 1,
      userId: 1,
      productCode: "214143324",
      pictureUrl: "https://kama-konskie.pl/wp-content/uploads/2018/02/nutella_350g.jpg",
      productName: "Natella2",
      quantity: "400g",
      status: "tak",
      usagePercentage: "70",
      expirationDate: "2023-06-30",
      openingDate: "2023-06-12",
      openExpirationDate: "2023-06-30",
    },
    {id: 1,
      userId: 1,
      productCode: "214143324",
      pictureUrl: "https://kama-konskie.pl/wp-content/uploads/2018/02/nutella_350g.jpg",
      productName: "Nztella3",
      quantity: "400g",
      status: "tak",
      usagePercentage: "70",
      expirationDate: "2023-06-30",
      openingDate: "2023-06-12",
      openExpirationDate: "2023-06-30",
    },
    {id: 1,
      userId: 1,
      productCode: "214143324",
      pictureUrl: "https://kama-konskie.pl/wp-content/uploads/2018/02/nutella_350g.jpg",
      productName: "Nwtella4",
      quantity: "400g",
      status: "tak",
      usagePercentage: "70",
      expirationDate: "2023-06-30",
      openingDate: "2023-06-12",
      openExpirationDate: "2023-06-30",
    },
    {id: 1,
      userId: 1,
      productCode: "214143324",
      pictureUrl: "https://kama-konskie.pl/wp-content/uploads/2018/02/nutella_350g.jpg",
      productName: "Nutella5",
      quantity: "400g",
      status: "tak",
      usagePercentage: "70",
      expirationDate: "2023-06-15",
      openingDate: "2023-06-12",
      openExpirationDate: "2023-06-30",
    },
  ];
  const router = useRouter();
  const [items, setItems] = useState<Product[]>([]);
  const [allItems, setAllItems] = useState(items);
  const [ascending, setAscending] = useState(true);
  const { data, refetch } = useProducts();
  const { mutate: mutateUpdate } = useUpdateProduct();
  const{ mutate: mutateDelete } = useDeleteProduct();
  
  useRefreshOnFocus(refetch);
  const useData = async () => {
    await useRefreshOnFocus(refetch);
    console.log("useProducts", data);
    if (data != undefined) {
      setItems(data);
    }
  };
  useData();

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

  const filterProducts = (period: string, categories: string[]) => {
    console.log("PERIOD: " + period);
    console.log("CATEGORIES: " + categories);
    if (period === "3") {
      setItems(allItems.filter((el) => daysLeft(el) < 3));
    } else if (period === "5") {
      setItems(allItems.filter((el) => daysLeft(el) < 5));
    } else {
      setItems(allItems);
    }
  };

  const expDatevsOpenExpDate = (item: Product) => {
    let exp = item.expirationDate ?? maxDate;
    let open = item.openExpirationDate ?? maxDate;
    if (exp < (open)) {
      return exp;
    }
    return open;
  };

  const sortByDate = (itemA: Product, itemB: Product) => {
    let expA = expDatevsOpenExpDate(itemA);
    let expB = expDatevsOpenExpDate(itemB);
    if(expA > expB){
      return 1;
    } else{
      return -1;
    }
  }

  const daysLeft = (item: Product) => {
    let expDate = expDatevsOpenExpDate(item);
    if(expDate === null){
      return Infinity;
    } else{
      return Math.ceil(
        (parse(expDate, "dd.MM.yyyy", new Date()).setHours(
          0,
          0,
          0,
          0
        ) -
          new Date().setHours(0, 0, 0, 0)) /
          (1000 * 3600 * 24)
      );
    }
  };

  const sortProducts = (by: string, asc: boolean) => {
    if (by === "name") {
      if (asc) {
        setItems((prev) =>
          prev.sort((a, b) => (a.productName ?? "").localeCompare(b.productName ?? ""))
        );
        setAllItems((prev) =>
          prev.sort((a, b) => (a.productName ?? "").localeCompare(b.productName ?? ""))
        );
      } else {
        setItems((prev) =>
          prev.sort((a, b) => (b.productName ?? "").localeCompare(a.productName ?? ""))
        );
        setAllItems((prev) =>
          prev.sort((a, b) => (b.productName ?? "").localeCompare(a.productName ?? ""))
        );
      }
    } else if (by === "expirationdate") {
      if (asc) {
        setItems((prev) =>
          prev.sort((a, b) => sortByDate(a, b))
        );
        setAllItems((prev) =>
        prev.sort((a, b) => sortByDate(a, b))
        );
      } else {
        setItems((prev) =>
        prev.sort((a, b) => sortByDate(b, a))
        );
        setAllItems((prev) =>
        prev.sort((a, b) => sortByDate(b, a))
        );
      }
    }
  };

  const eat = (product: Product, perc: number) => {
    let productData;
    if(perc === 100){
      productData = {...product, usagePercentage: perc.toString(), status: "eaten"};
      mutateUpdate(productData);
    }else{
      productData = {...product, usagePercentage: perc.toString()};
      mutateUpdate(productData);
    }
    //TODO - tu przeładowanie zeby pobrac wszystkie aktualne produkty
    
  };
  const edit = (id: number) => {};
  const throwAway = (product: Product) => {
    const productData = {...product, status: "disposed"};
    console.log(productData);
    mutateUpdate(productData);
     //TODO - tu przeładowanie zeby pobrac wszystkie aktualne produkty
  };

  return (
    <View style={styles.container}>
      <ProductSearch />
      {items && <FilterAndSearch props={{ showFilterAndSort }} />}
      {data != undefined && items.length === 0 && (
        <View style={styles.centeredContainer}>
          <Text>You have no products.</Text>
        </View>
      )}
      {data != undefined && items.length > 0 && (
        <ScrollView style={styles.scroll}>
          {items.map((it, index) => (
            <ListItem item={it} key={index} eatItem={eat} throwAway={throwAway}/>
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
        <SortModal sort={sortProducts} asc={ascending} setAsc={setAscending} />
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
