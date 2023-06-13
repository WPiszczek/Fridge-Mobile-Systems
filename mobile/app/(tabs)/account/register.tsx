import React from "react";
import { RegisterForm } from "../../../forms/RegisterForm";
import { View } from "../../../components/Themed";
import { Button } from "react-native-paper";
import { Redirect, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { useMe } from "../../../api/services/user";

export default function RegisterScreen() {
  const { status } = useMe();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {status === "success" && <Redirect href="/account" />}
      <RegisterForm />
      <Button onPress={() => router.push("account/login")}>
        Already have an account? Log in!
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    gap: 10,
  },
});
