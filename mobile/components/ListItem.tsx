import React, { Dispatch, SetStateAction } from "react";
import { differenceInCalendarDays, format, getYear } from "date-fns";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import { AntDesign } from "@expo/vector-icons";
import { Product } from "../api/services/product";
import { Modal } from "react-native-paper";
import EditItem from "./EditItem";

interface ListItemProps {
  item: Product;
  eatItem: (product: Product, perc: number) => void;
  throwAway: (product: Product) => void;
  isSelected: boolean;
  setSelected: Dispatch<SetStateAction<number | undefined>>;
}

let maxDate = "9999-12-31";

export default function ListItem({
  item,
  eatItem,
  throwAway,
  isSelected,
  setSelected,
}: ListItemProps) {
  let url = item.pictureUrl != null ? item.pictureUrl : "";
  let expDate = new Date(item.expirationDate ?? maxDate);
  let opExpDate = new Date(item.openExpirationDate ?? maxDate);
  let soonerExpirationDate = expDate < opExpDate ? expDate : opExpDate;

  // let parsedSoonerExpDate = so

  let days = differenceInCalendarDays(soonerExpirationDate, new Date()); // TODO - ujemne wartosci zmienic na "PRZETERMINOWANE"
  let warning =
    days < 7 && days > 5 ? (
      <AntDesign
        name="exclamationcircleo"
        style={styles.ExpirationDateWarning}
        color="orange"
      />
    ) : (
      days < 5 && (
        <AntDesign
          name="warning"
          style={styles.ExpirationDateWarning}
          color="red"
        />
      )
    );
  return (
    <TouchableOpacity
      onPress={() =>
        setSelected((id) => (id === item.id ? undefined : item.id))
      }
    >
      <View style={styles.ListItem}>
        {url ? (
          <Image style={styles.ItemImage} source={{ uri: url }} />
        ) : (
          <View style={styles.ItemImage} />
        )}
        <View style={styles.ListItemDescription}>
          <View style={styles.ListItemDescriptionLeft}>
            <Text style={styles.ItemCode}>{item.productCode}</Text>
            <Text numberOfLines={1} style={styles.ItemName}>
              {item.productName}
            </Text>
            {/* <Text style={styles.ItemAmount}>{item.quantity}</Text> */}
            <Text numberOfLines={1}>
              {item.tags?.map((tag) => tag.name).join(", ")}
            </Text>
          </View>
        </View>
        <View style={styles.ExpirationDate}>
          <Text style={styles.ExpirationDateDate}>
            {getYear(soonerExpirationDate) === 9999
              ? "?"
              : format(soonerExpirationDate, "dd.MM.yyyy")}
          </Text>
          <Text
            style={[
              styles.ExpirationDateColoredPart,
              days > 5 && days < 7 ? styles.Orange : days < 5 && styles.Red,
            ]}
          >
            {warning}
            {getYear(soonerExpirationDate) === 9999 ? "?" : ` ${days} dni`}
          </Text>
          <Text style={styles.ExpirationDatePercentage}>
            {item.usagePercentage ? item.usagePercentage + "%" : ""}
          </Text>
        </View>
      </View>
      <Modal visible={isSelected} onDismiss={() => setSelected(undefined)}>
        <EditItem
          eatItem={eatItem}
          id={item.id}
          minPercentage={parseInt(item.usagePercentage ?? "0")}
          throwAway={throwAway}
          product={item}
        />
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  //TODO - szerokość 100%
  ListItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    position: "relative",
  },
  ItemImage: {
    alignSelf: "center",
    height: 50,
    width: 50,
    borderRadius: 5,
    flex: 1,
  },
  ListItemDescription: {
    flexDirection: "row",
    paddingVertical: 10,
    flex: 5,
  },
  ItemCode: {
    fontSize: 12,
  },
  ItemName: {
    fontSize: 20,
  },
  ItemAmount: {},
  ListItemDescriptionLeft: {
    padding: 5,
    paddingRight: 10,
    flex: 2,
  },
  ItemCategories: {
    fontSize: 10,
  },
  ExpirationDate: {
    paddingVertical: 10,
    flexDirection: "column",
    alignItems: "flex-end",
    flex: 2,
  },
  ExpirationDateDate: {
    fontSize: 12,
  },
  ExpirationDateWarning: {
    fontSize: 12,
  },
  ExpirationDateColoredPart: {}, //TODO - zmiana koloru w zaleznosci od daty
  Orange: {
    color: "orange",
  },
  Red: {
    color: "red",
  },
  ExpirationDatePercentage: {},
});
