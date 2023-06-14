import React from "react";
import { parse } from "date-fns";
import { StyleSheet, Image } from "react-native";
import { Text, View } from "./Themed";
import { AntDesign } from "@expo/vector-icons";

interface ListItemProps {
  item: {
    id: number;
    userId: number;
    productCode: number;
    pictureUrl: string;
    productName: string;
    expirationDate: string;
    openingDate: string;
    openExpirationDate: string;
    quantity: string;
    status: string;
    usagePercentage: string;
  };
}

export default function ListItem({ item }: ListItemProps) {
  let soonerExpirationDate =
    parse(item.expirationDate, "dd.MM.yyyy", new Date()).setHours(0, 0, 0, 0) <
    parse(item.openExpirationDate, "dd.MM.yyyy", new Date()).setHours(
      0,
      0,
      0,
      0
    )
      ? item.expirationDate
      : item.openExpirationDate;
  let timeBetween =
    parse(soonerExpirationDate, "dd.MM.yyyy", new Date()).setHours(0, 0, 0, 0) -
    new Date().setHours(0, 0, 0, 0);
  let days = Math.ceil(timeBetween / (1000 * 3600 * 24)); // TODO - ujemne wartosci zmienic na "PRZETERMINOWANE"
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
    <View style={styles.ListItem}>
      <Image style={styles.ItemImage} source={{ uri: item.pictureUrl }} />
      <View style={styles.ListItemDescription}>
        <View style={styles.ListItemDescriptionLeft}>
          <Text style={styles.ItemCode}>{item.productCode.toString()}</Text>
          <Text style={styles.ItemName}>{item.productName}</Text>
          <Text style={styles.ItemAmount}>{item.quantity}</Text>
        </View>
        <View style={styles.ListItemDescriptionRight}>
          <Text style={styles.ItemCategories}>Słodycze</Text>
          <Text style={styles.ItemCategories}>Szafka lewa górna</Text>
        </View>
      </View>
      <View style={styles.SpaceFiller}></View>
      <View style={styles.ExpirationDate}>
        <Text style={styles.ExpirationDateDate}>{soonerExpirationDate}</Text>
        <Text
          style={[
            styles.ExpirationDateColoredPart,
            days > 5 && days < 7 ? styles.Orange : days < 5 && styles.Red,
          ]}
        >
          {/* {" "} */}
          {warning}
          {` ${days} dni`}
        </Text>
        <Text style={styles.ExpirationDatePercentage}>
          {item.usagePercentage}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //TODO - szerokość 100%
  ListItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  ItemImage: {
    alignSelf: "center",
    minHeight: 60,
    minWidth: 60,
    borderRadius: 5,
  },
  ListItemDescription: {
    flexDirection: "row",
    paddingVertical: 10,
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
  },
  ListItemDescriptionRight: {
    padding: 5,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  ItemCategories: {
    fontSize: 12,
  },
  SpaceFiller: {
    flex: 1,
  },
  ExpirationDate: {
    padding: 5,
    flexDirection: "column",
    alignItems: "flex-end",
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
