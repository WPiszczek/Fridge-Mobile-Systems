import { useQuery } from "@tanstack/react-query";
import { Button, StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import { LoginForm } from "../../forms/LoginForm";
import { RegisterForm } from "../../forms/RegisterForm";
import { apiClient } from "../../lib/apiClient";
import { useEffect } from "react";

export default function AccountScreen() {
  // const { data, error } = useQuery({
  //   queryKey: ["me"],
  //   queryFn: () => apiClient.get("/me"),
  // });

  // const { mutate: logout } = useMutation({
  //   mutationKey: ["logout"],
  //   mutationFn: async () => {
  //     const res = await apiClient.post("/auth/logout");
  //     alert(JSON.stringify(res.data, null, 2));
  //     return res.data.data;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["me"]);
  //   },
  // });

  return (
    <View style={styles.container}>
      {/* {data ? ( */}
      <>
        {/* <Text>
            Hey {data.data.data.firstName} {data.data.data.lastName}!
          </Text>
          <Text>
            You're logged in as {data.data.data.login} ({data.data.data.email})
          </Text> */}
        {/* <Button title="Log out" onPress={() => logout()} /> */}
      </>
      {/* ) : ( */}
      <>
        <RegisterForm />
        <LoginForm />
        <Button
          title="hello"
          onPress={() => {
            fetch("http://localhost:8000/api/me").then((res) => {
              res.json().then((data) => alert(JSON.stringify(data, null, 2)));
            });
          }}
        />
      </>
      {/* )} */}
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
