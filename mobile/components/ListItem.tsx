import React from "react";
import { parse } from "date-fns";
import { StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";
import { Text, View } from "./Themed";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
interface ListItemProps {
  item: {
    code: number;
    itemName: string;
    amount: string;
    categories: string[];
    date: string;
  };
}

export default function ListItem({ item }: ListItemProps) {
  let timeBetween =
    parse(item.date, "dd.MM.yyyy", new Date()).setHours(0, 0, 0, 0) -
    new Date().setHours(0, 0, 0, 0);
  let days = Math.ceil(timeBetween / (1000 * 3600 * 24)); // TODO - ujemne wartosci zmienic na "PRZETERMINOWANE"
  console.log(parse(item.date, "dd.MM.yyyy", new Date()));
  console.log(new Date());
  let warning =
    days < 7 ? (
      days < 5 ? (
        <AntDesign
          name="warning"
          style={styles.ExpirationDateWarning}
          color="red"
        />
      ) : (
        <AntDesign
          name="exclamationcircleo"
          style={styles.ExpirationDateWarning}
          color="orange"
        />
      )
    ) : (
      ""
    );
  return (
    <View style={styles.ListItem}>
      <Image
        style={styles.ItemImage}
        source={require("../assets/images/nutella.png")}
      />
      <View style={styles.ListItemDescription}>
        <View style={styles.ListItemDescriptionLeft}>
          <Text style={styles.ItemCode}>{item.code.toString()}</Text>
          <Text style={styles.ItemName}>{item.itemName}</Text>
          <Text style={styles.ItemAmount}>{item.amount}</Text>
        </View>
        <View style={styles.ListItemDescriptionRight}>
          <Text style={styles.ItemCategories}>Słodycze</Text>
          <Text style={styles.ItemCategories}>Szafka lewa górna</Text>
        </View>
      </View>
      <View style={styles.SpaceFiller}></View>
      <View style={styles.ExpirationDate}>
        <Text style={styles.ExpirationDateDate}>{item.date}</Text>
        <Text style={[styles.ExpirationDateColoredPart, ]}>
          {/* {" "} */}
          {warning}
          {`${days} dni`}
        </Text>
        <Text style={styles.ExpirationDatePercentage}>70%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ //TODO - szerokość 100%
  ListItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  ItemImage: {
    alignSelf: "center",
  },
  ListItemDescription: {
    flexDirection: "row",
    padding: 10,
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
  ExpirationDatePercentage: {},
});
