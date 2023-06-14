import React from "react";
import { differenceInCalendarDays, format, getYear, parse, parseISO } from "date-fns";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import { AntDesign } from "@expo/vector-icons";
import { Product } from "../api/services/product";
import { Modal } from "react-native-paper";
import EditItem from "./EditItem";

interface ListItemProps {
  item: Product;
  eatItem: (id: number) => (void);
}

let maxDate = "9999-12-31";

export default function ListItem({ item, eatItem }: ListItemProps) {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(!visible);
  const hideModal = () => setVisible(false);


  let url = item.pictureUrl != null ? item.pictureUrl : "";
  let expDate = parse(maxDate, "yyyy-MM-dd", new Date());
  let opExpDate = parse(maxDate, "yyyy-MM-dd", new Date());
  let soonerExpirationDate =expDate < opExpDate
      ? expDate
      : opExpDate;

  // let parsedSoonerExpDate = so

  // let timeBetween =
  //   parse(soonerExpirationDate, "yyyy-MM-dd", new Date()).setHours(0, 0, 0, 0) -
  //   new Date().setHours(0, 0, 0, 0);
  let days = differenceInCalendarDays(soonerExpirationDate, new Date());// TODO - ujemne wartosci zmienic na "PRZETERMINOWANE"
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
    <TouchableOpacity onPress={showModal}>
    <View style={styles.ListItem}>
      <Image style={styles.ItemImage} source={{ uri: url }} />
      <View style={styles.ListItemDescription}>
        <View style={styles.ListItemDescriptionLeft}>
          <Text style={styles.ItemCode}>{item.productCode}</Text>
          <Text style={styles.ItemName}>{item.productName}</Text>
          <Text style={styles.ItemAmount}>{item.quantity}</Text>
        </View>
        <View style={styles.ListItemDescriptionRight}>
          <Text style={styles.ItemCategories}>Słodycze</Text>
          <Text style={styles.ItemCategories}>Szafka lewa górna</Text>
        </View>
      </View>
      <View style={styles.ExpirationDate}>
        <Text style={styles.ExpirationDateDate}>{getYear(soonerExpirationDate) === 9999 ? "Set expiration date" : format(soonerExpirationDate, "yyyy-MM-dd")}</Text>
        <Text
          style={[
            styles.ExpirationDateColoredPart,
            days > 5 && days < 7 ? styles.Orange : days < 5 && styles.Red,
          ]}
        >
          {/* {" "} */}
          {warning}
          {getYear(soonerExpirationDate) === 9999 ?"Set exp date" : ` ${days} dni`}
        </Text>
        <Text style={styles.ExpirationDatePercentage}>
          {item.usagePercentage}
        </Text>
      </View>
    </View>
    <Modal
        visible={visible}
        onDismiss={hideModal}
        // contentContainerStyle={styles.modal}
      >
        <EditItem eatItem={eatItem} id={item.id}/>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  //TODO - szerokość 100%
  ListItem: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    position: "relative",
  },
  ItemImage: {
    alignSelf: "center",
    height: 50,
    width: 50,
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
    fontSize: 10,
  },
  ExpirationDate: {
    paddingVertical: 10,
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
