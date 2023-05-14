import { FC, ReactElement } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  before?: ReactElement;
  after?: ReactElement;
}

export const Input: FC<InputProps> = (props) => (
  <View style={styles.container}>
    <>{props.before}</>
    <TextInput style={styles.input} {...props} />
    <>{props.after}</>
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 8,

    height: 48,
    paddingHorizontal: 8,
    color: "#3c3c3c",
    backgroundColor: "#efefef",
    borderRadius: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
