import { Redirect } from "expo-router";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["AxiosError: Request failed with status code 401"]);

export default function App() {
  return <Redirect href="/products" />;
}
