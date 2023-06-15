import { ScrollView, StyleSheet } from "react-native";
import ListItem from "../../../components/ListItem";
import { ProductSearch } from "../../../components/ProductSearch";
import { Text, View } from "../../../components/Themed";
import { useMemo, useState } from "react";
import { useProducts, useUpdateProduct } from "../../../api/services/product";
import { useRefreshOnFocus } from "../../../lib/useRefreshOnFocus";
import { FilterAndSearch } from "../../../components/FilterAndSearch";
import { Button, Modal } from "react-native-paper";
import { FilterModal, Filters } from "../../../components/FilterModal";
import SortModal, { Sorting } from "../../../components/SortModal";
import { useRouter } from "expo-router";
import { Product } from "../../../api/services/product";
import { daysLeft, sortByDate } from "../../../lib/dateUtils";

export default function ProductListScreen() {
  const router = useRouter();

  const { data: items, refetch } = useProducts();
  useRefreshOnFocus(refetch);

  const { mutate: mutateUpdate } = useUpdateProduct(refetch);
  // const { mutate: mutateDelete } = useDeleteProduct();

  const [visibleFilters, setVisibleFilters] = useState(false);
  const [visibleSort, setVisibleSort] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    days: "all",
    tags: [],
  });

  const [sorting, setSorting] = useState<Sorting>({
    sortBy: "none",
    ascending: true,
  });

  const eat = (product: Product, perc: number) => {
    let productData;
    if (perc === 100) {
      productData = {
        ...product,
        usagePercentage: perc.toString(),
        status: "eaten",
      };
      mutateUpdate(productData);
    } else {
      productData = { ...product, usagePercentage: perc.toString() };
      mutateUpdate(productData);
    }
    //TODO - tu przeładowanie zeby pobrac wszystkie aktualne produkty
  };
  const edit = (id: number) => {};
  const throwAway = (product: Product) => {
    const productData = { ...product, status: "disposed" };
    console.log(productData);
    mutateUpdate(productData);
    //TODO - tu przeładowanie zeby pobrac wszystkie aktualne produkty
  };

  const filteredSortedItems = useMemo(() => {
    const filtered = items?.filter((item) => {
      let daysFilterPassed = false;
      const days = daysLeft(item);
      if (filters.days === "all") {
        daysFilterPassed = true;
      } else if (filters.days === "3") {
        daysFilterPassed = days < 3;
      } else if (filters.days === "5") {
        daysFilterPassed = days < 5;
      }

      const tagsFilterPassed =
        filters.tags.length === 0 ||
        item.tags?.some((tag) => filters.tags.includes(tag.name));

      return daysFilterPassed && tagsFilterPassed;
    });

    const sorted = filtered?.sort((a, b) => {
      const ascendingFactor = sorting.ascending ? 1 : -1;
      if (sorting.sortBy === "name") {
        return (
          (a.productName ?? "").localeCompare(b.productName ?? "") *
          ascendingFactor
        );
      } else if (sorting.sortBy === "expirationDate") {
        return sortByDate(a, b) * ascendingFactor;
      } else {
        return 0;
      }
    });

    return sorted;
  }, [items, filters, sorting]);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <ProductSearch />
        {items && (
          <FilterAndSearch
            showFilterModal={() => setVisibleFilters(true)}
            showSortModal={() => setVisibleSort(true)}
          />
        )}
      </View>
      {items != undefined && items.length === 0 && (
        <View style={styles.centeredContainer}>
          <Text>You have no products.</Text>
        </View>
      )}
      {items != undefined && items.length > 0 && (
        <ScrollView style={styles.scroll}>
          {filteredSortedItems?.map((it, index) => (
            <ListItem
              item={it}
              key={index}
              eatItem={eat}
              throwAway={throwAway}
            />
          ))}
        </ScrollView>
      )}
      {!items && (
        <View style={styles.centeredContainer}>
          <Button mode="elevated" onPress={() => router.push("/account/login")}>
            Log in, to browse your products
          </Button>
        </View>
      )}
      <Modal
        visible={visibleFilters}
        onDismiss={() => setVisibleFilters(false)}
        contentContainerStyle={styles.modal}
      >
        <FilterModal filters={filters} setFilters={setFilters} />
      </Modal>
      <Modal
        visible={visibleSort}
        onDismiss={() => setVisibleSort(false)}
        contentContainerStyle={styles.modal}
      >
        <SortModal sorting={sorting} setSorting={setSorting} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  topView: {
    paddingTop: 15,
    paddingHorizontal: 15,
    width: "100%",
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
