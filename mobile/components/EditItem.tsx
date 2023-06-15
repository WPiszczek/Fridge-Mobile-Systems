import { Button } from "react-native-paper";
import { View, Text } from "./Themed";
import { StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { useState } from "react";
import { Slider } from "@miblanchard/react-native-slider";
import { useTheme } from "../theme/utils";
import { Product } from "../api/services/product";
import { useRouter } from "expo-router";

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
  product,
}: EditItemProps) {
  const theme = useTheme();
  const router = useRouter();
  const [percentage, setPercentage] = useState(minPercentage);
  const [throwModalVisible, setThrowModalVisible] = useState(false);
  const [eatModalVisible, setEatModalVisible] = useState(false);

  const toggleEatModal = () => {
    setEatModalVisible(!eatModalVisible);
  };
  const toggleThrowModal = () => {
    setThrowModalVisible(!throwModalVisible);
  };

  const backgroundColor = theme.colors.background;
  const tint = theme.colors.primary;

  const changePercentage = (val: number) => {
    setPercentage(val);
  };

  const handleThrow = () => {
    throwAway(product);
    toggleThrowModal();
  };

  const handleEat = () => {
    eatItem(product, percentage);
    toggleEatModal();
  };

  return (
    <View style={[styles.options, { backgroundColor: "transparent" }]}>
      <Button
        icon="food-drumstick-outline"
        mode="contained"
        onPress={() => toggleEatModal()}
      >
        Eat
      </Button>
      <Button
        icon="pencil"
        mode="contained"
        onPress={() => {
          router.push(`/products/${id}/edit`);
        }}
      >
        Edit
      </Button>

      <Button
        icon="delete-outline"
        mode="contained"
        onPress={() => toggleThrowModal()}
      >
        Throw away
      </Button>
      <Portal>
        <Modal
          visible={eatModalVisible}
          onDismiss={toggleEatModal}
          contentContainerStyle={[
            styles.modal,
            { backgroundColor: backgroundColor },
          ]}
        >
          <Slider
            value={percentage}
            minimumValue={0}
            maximumValue={100}
            step={5}
            onValueChange={(val) => changePercentage(val[0])}
            containerStyle={styles.slider}
            thumbTintColor={tint}
          />
          <Text
            style={styles.percText}
          >{`Percentage eaten: ${percentage}`}</Text>

          <Button icon="check" mode="contained" onPress={() => handleEat()}>
            Save
          </Button>
        </Modal>

        <Modal
          visible={throwModalVisible}
          onDismiss={toggleThrowModal}
          contentContainerStyle={[
            styles.modal,
            { backgroundColor: backgroundColor },
          ]}
        >
          <Text style={styles.percText}>
            Are you sure you want to throw it away?
          </Text>
          <Button icon="check" mode="contained" onPress={() => handleThrow()}>
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
