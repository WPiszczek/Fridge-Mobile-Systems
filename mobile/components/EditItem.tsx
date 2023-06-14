import { Button, IconButton } from "react-native-paper";
import { View, Text } from "./Themed";
import { StyleSheet, Image } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { useState } from "react";
import { Slider } from "@miblanchard/react-native-slider";
import { useTheme, useThemeColor } from "../theme/utils";
import { Product } from "../api/services/product";
// const theme = useTheme();

interface EditItemProps {
  eatItem: (item: Product, percentage: number) => void;
  id: number;
  minPercentage: number;
  product: Product;
  throwAway: (product: Product) => void;
}

export default function EditItem({
  eatItem,
  id,
  minPercentage,
  throwAway,
  product
}: EditItemProps) {
  const theme = useTheme();
  const [percentage, setPercentage] = useState(minPercentage);
  const [visibleThrow, setvisibleThrow] = useState(false);
  const [visibleEat, setvisibleEat] = useState(false);

  const showModalEat = () => {
      setvisibleEat(!visibleEat);

  };

  const showModalThrow = () => {
    setvisibleThrow(!visibleThrow);

  };
  const hideModalEat = () => setvisibleEat(false);
  const hideModalThrow = () => setvisibleThrow(false);
  const backgroundColor = theme.colors.background;
  const iconColor = theme.colors.text;
  const tint = theme.colors.primary;

  const changePercentage = (val: number) => {
    setPercentage(val);
  };

  const handleThrow = () => {
    throwAway(product);
    showModalThrow();
  }

  const handleEat = () => {
    eatItem(product, percentage);
    showModalEat();
  }

  return (
    <View style={[styles.options, { backgroundColor: "transparent" }]}>
      <Button
        icon="food-drumstick-outline"
        mode="contained"
        onPress={() => showModalEat()}
      >
        Eat
      </Button>
      <Button
        icon="pencil"
        mode="contained"
        onPress={() => console.log("edit")}
      >
        Edit
      </Button>

      <Button
        icon="delete-outline"
        mode="contained"
        onPress={() => showModalThrow()}
      >
        Throw away
      </Button>
      <Portal>
        <Modal
          visible={visibleEat}
          onDismiss={hideModalEat}
          contentContainerStyle={[
            styles.modal,
            { backgroundColor: backgroundColor },
          ]}
        >
          <Slider
            value={percentage}
            minimumValue={0}
            maximumValue={100}
            step={10}
            onValueChange={(val) => changePercentage(val[0])}
            containerStyle={styles.slider}
            thumbTintColor={tint}
          />
          <Text
            style={styles.percText}
          >{`Percentage eaten: ${percentage}`}</Text>

          <Button
            icon="check"
            mode="contained"
            onPress={() => handleEat()}
          >
            Save
          </Button>
        </Modal>

        <Modal
          visible={visibleThrow}
          onDismiss={hideModalThrow}
          contentContainerStyle={[
            styles.modal,
            { backgroundColor: backgroundColor },
          ]}
        >
          <Text style={styles.percText}>Are you sure You want to throw it away?</Text>
          <Button
            icon="check"
            mode="contained"
            onPress={() => handleThrow()}
          >
            Im sure, throw it away!
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  options: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    height: 80,
  },
  slider: {
    width: "80%",
    marginVertical: 20,
  },
  percText: {
    marginVertical: 20,
  },
  modal: {
    backgroundColor: "red",
    // minHeight: "40%",
    alignItems: "center",
    paddingVertical: 20,
    width: "90%",
    alignSelf: "center",
  },
});
