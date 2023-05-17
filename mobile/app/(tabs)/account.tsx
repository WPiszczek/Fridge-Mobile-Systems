import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, StyleSheet, Text } from "react-native";
import { View } from "../../components/Themed";
import { LoginForm } from "../../forms/LoginForm";
import { RegisterForm } from "../../forms/RegisterForm";
import { getMe } from "../../api/services/me";
import { apiClient, queryClient } from "../../api/clients";

export default function AccountScreen() {
  const { data, error, status } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const { mutate: logout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => await apiClient.post("/auth/logout"),
    onSuccess: () => queryClient.clear(),
  });

  return (
    <View style={styles.container}>
      <Text>{status}</Text>
      {!error && data ? (
        <>
          <Text>
            Hey {data.data.data.firstName} {data.data.data.lastName}!
          </Text>
          <Text>
            You're logged in as {data.data.data.login} ({data.data.data.email})
          </Text>
          <Button title="Log out" onPress={() => logout()} />
        </>
      ) : (
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
      )}
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
