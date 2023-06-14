import { ScrollView, StyleSheet } from "react-native";
import ListItem from "../../../components/ListItem";
import { ProductSearch } from "../../../components/ProductSearch";
import { Text, View } from "../../../components/Themed";
import { useState, useEffect } from "react";
import { useProducts } from "../../../api/services/product";
import { useRefreshOnFocus } from "../../../lib/useRefreshOnFocus";
import FilterAndSearch from "../../../components/FilterAndSearch";
import { Modal } from "react-native-paper";
import FilterModal from "../../../components/FilterModal";
import SortModal from "../../../components/SortModal";
import { parse } from "date-fns";

export default function ProductListScreen() {
  const [items, setItems] = useState([
    {
      id: 7,
      userId: 1,
      productCode: "5449000214911",
      productName: "Coca-cola",
      quantity: "100ml",
      pictureUrl:
        "https://images.openfoodfacts.org/images/products/544/900/021/4911/front_en.119.400.jpg",
      status: "exists",
      usagePercentage: "100",
      expirationDate: "20.06.2023",
      openingDate: "18.06.2023",
      openExpirationDate: "18.06.2023",
      tags: [
        {
          id: 4,
          name: "Zimne",
        },
      ],
    },
    {
      id: 7,
      userId: 1,
      productCode: "5449000214911",
      productName: "Caca-cola",
      quantity: "100ml",
      pictureUrl:
        "https://images.openfoodfacts.org/images/products/544/900/021/4911/front_en.119.400.jpg",
      status: "exists",
      usagePercentage: "100",
      expirationDate: "20.06.2023",
      openingDate: "18.06.2023",
      openExpirationDate: "18.06.2023",
      tags: [
        {
          id: 4,
          name: "Zimne",
        },
      ],
    },
    {
      id: 7,
      userId: 1,
      productCode: "5449000214911",
      productName: "Czca-cola",
      quantity: "100ml",
      pictureUrl:
        "https://images.openfoodfacts.org/images/products/544/900/021/4911/front_en.119.400.jpg",
      status: "exists",
      usagePercentage: "100",
      expirationDate: "20.06.2023",
      openingDate: "18.06.2023",
      openExpirationDate: "18.06.2023",
      tags: [
        {
          id: 4,
          name: "Zimne",
        },
      ],
    },
    {
      id: 7,
      userId: 1,
      productCode: "5449000214911",
      productName: "Cwca-cola",
      quantity: "100ml",
      pictureUrl:
        "https://images.openfoodfacts.org/images/products/544/900/021/4911/front_en.119.400.jpg",
      status: "exists",
      usagePercentage: "100",
      expirationDate: "17.06.2023",
      openingDate: "18.06.2023",
      openExpirationDate: "27.06.2023",
      tags: [
        {
          id: 4,
          name: "Zimne",
        },
      ],
    },
    {
      id: 7,
      userId: 1,
      productCode: "5449000214911",
      productName: "Coca-cola",
      quantity: "100ml",
      pictureUrl:
        "https://images.openfoodfacts.org/images/products/544/900/021/4911/front_en.119.400.jpg",
      status: "exists",
      usagePercentage: "100",
      expirationDate: "21.06.2023",
      openingDate: "18.06.2023",
      openExpirationDate: "12.06.2023",
      tags: [
        {
          id: 4,
          name: "Ciepłe",
        },
      ],
    },
    {
      id: 7,
      userId: 1,
      productCode: "5449000214911",
      productName: "Coca-cola",
      quantity: "100ml",
      pictureUrl:
        "https://images.openfoodfacts.org/images/products/544/900/021/4911/front_en.119.400.jpg",
      status: "exists",
      usagePercentage: "100",
      expirationDate: "23.06.2023",
      openingDate: "18.06.2023",
      openExpirationDate: "23.06.2023",
      tags: [
        {
          id: 4,
          name: "Zimne",
        },
      ],
    },
    {
      id: 7,
      userId: 1,
      productCode: "5449000214911",
      productName: "Coca-cola",
      quantity: "100ml",
      pictureUrl:
        "https://images.openfoodfacts.org/images/products/544/900/021/4911/front_en.119.400.jpg",
      status: "exists",
      usagePercentage: "100",
      expirationDate: "27.06.2023",
      openingDate: "18.06.2023",
      openExpirationDate: "18.06.2023",
      tags: [
        {
          id: 4,
          name: "Zimne",
        },
      ],
    },
    {
      id: 7,
      userId: 1,
      productCode: "5449000214911",
      productName: "Coca-cola",
      quantity: "100ml",
      pictureUrl:
        "https://images.openfoodfacts.org/images/products/544/900/021/4911/front_en.119.400.jpg",
      status: "exists",
      usagePercentage: "100",
      expirationDate: "25.06.2023",
      openingDate: "18.06.2023",
      openExpirationDate: "18.06.2023",
      tags: [
        {
          id: 4,
          name: "Zimne",
        },
      ],
    },
  ]);
  const [allItems, setAllItems] = useState(items);
  const [ascending, setAscending] = useState(true);
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

  const expDatevsOpenExpDate = (item: {
    id: number;
    userId: number;
    productCode: string;
    productName: string;
    quantity: string;
    pictureUrl: string;
    status: string;
    usagePercentage: string;
    expirationDate: string;
    openingDate: string;
    openExpirationDate: string;
    tags: { id: number; name: string }[];
  }) => {
    return parse(item.expirationDate, "dd.MM.yyyy", new Date()).setHours(
      0,
      0,
      0,
      0
    ) <
      parse(item.openExpirationDate, "dd.MM.yyyy", new Date()).setHours(
        0,
        0,
        0,
        0
      )
      ? item.expirationDate
      : item.openExpirationDate;
  };

  const daysLeft = (item: {
    id: number;
    userId: number;
    productCode: string;
    productName: string;
    quantity: string;
    pictureUrl: string;
    status: string;
    usagePercentage: string;
    expirationDate: string;
    openingDate: string;
    openExpirationDate: string;
    tags: { id: number; name: string }[];
  }) => {
    return Math.ceil(
      (parse(expDatevsOpenExpDate(item), "dd.MM.yyyy", new Date()).setHours(
        0,
        0,
        0,
        0
      ) -
        new Date().setHours(0, 0, 0, 0)) /
        (1000 * 3600 * 24)
    );
  };

  const sortProducts = (by: string, asc: boolean) => {
    console.log("TO po " + by + " i czy asc" + asc);
    if (by === "name") {
      if (asc) {
        setItems((prev) =>
          prev.sort((a, b) => a.productName.localeCompare(b.productName))
        );
        setAllItems((prev) =>
          prev.sort((a, b) => a.productName.localeCompare(b.productName))
        );
      } else {
        setItems((prev) =>
          prev.sort((a, b) => b.productName.localeCompare(a.productName))
        );
        setAllItems((prev) =>
          prev.sort((a, b) => b.productName.localeCompare(a.productName))
        );
      }
    } else if (by === "expirationdate") {
      if (asc) {
        setItems((prev) =>
          prev.sort(
            (a, b) =>
              parse(expDatevsOpenExpDate(a), "dd.MM.yyyy", new Date()).setHours(
                0,
                0,
                0,
                0
              ) -
              parse(expDatevsOpenExpDate(b), "dd.MM.yyyy", new Date()).setHours(
                0,
                0,
                0,
                0
              )
          )
        );
        setAllItems((prev) =>
        prev.sort(
          (a, b) =>
            parse(expDatevsOpenExpDate(a), "dd.MM.yyyy", new Date()).setHours(
              0,
              0,
              0,
              0
            ) -
            parse(expDatevsOpenExpDate(b), "dd.MM.yyyy", new Date()).setHours(
              0,
              0,
              0,
              0
            )
        )
      );
      } else {
        setItems((prev) =>
          prev.sort(
            (a, b) =>
              parse(expDatevsOpenExpDate(b), "dd.MM.yyyy", new Date()).setHours(
                0,
                0,
                0,
                0
              ) -
              parse(expDatevsOpenExpDate(a), "dd.MM.yyyy", new Date()).setHours(
                0,
                0,
                0,
                0
              )
          )
        );
        setAllItems((prev) =>
          prev.sort(
            (a, b) =>
              parse(expDatevsOpenExpDate(b), "dd.MM.yyyy", new Date()).setHours(
                0,
                0,
                0,
                0
              ) -
              parse(expDatevsOpenExpDate(a), "dd.MM.yyyy", new Date()).setHours(
                0,
                0,
                0,
                0
              )
          )
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <ProductSearch />
      {data && <FilterAndSearch props={{ showFilterAndSort }} />}
      {data ? (
        <ScrollView style={styles.scroll}>
          {items.map((it, index) => (
            <ListItem item={it} key={index} />
          ))}
        </ScrollView>
      ) : (
        <Text>Zaloguj się, aby przeglądać produkty</Text>
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
  modal: {},
});
