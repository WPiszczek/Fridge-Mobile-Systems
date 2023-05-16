import React from "react";
import { StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";
import { Text, View } from "./Themed";

export default function ListItem() {
  return (
    <View style={styles.ListItem}>
      <Image
        style={styles.ItemImage}
        source={require("../assets/images/nutella.png")}
      />
      <View style={styles.ListItemDescription}>
        <View style={styles.ListItemDescriptionLeft}>
          <Text style={styles.ItemCode}>3017620422003</Text>
          <Text style={styles.ItemName}>Nutella</Text>
          <Text style={styles.ItemAmount}>400g</Text>
        </View>
        <View style={styles.ListItemDescriptionRight}>
          <Text style={styles.ItemCategories}>Słodycze</Text>
          <Text style={styles.ItemCategories}>Szafka lewa górna</Text>
        </View>
      </View>
      <View style={styles.SpaceFiller}></View>
      <View style={styles.ExpirationDate}>
        <Text style={styles.ExpirationDateDate}>21.02.2022</Text>
        <Text style={styles.ExpirationDateColoredPart}>14 dni</Text> 
        <Text style={styles.ExpirationDatePercentage}>70%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  ExpirationDate: {},
  ExpirationDateDate: {
    fontSize: 12,
  },
  ExpirationDateColoredPart: {}, //TODO - zmiana koloru w zaleznosci od daty
  ExpirationDatePercentage: {},
});
