// import { IOS_ANDROID_BACKEND_URL, WEB_BACKEND_URL } from "@env";
import { Redirect } from "expo-router";
import { LogBox } from "react-native";

// LogBox.ignoreLogs(["AxiosError: Request failed with status code 401"]);

// if (!WEB_BACKEND_URL || !IOS_ANDROID_BACKEND_URL)
//   throw new Error("Set backend URLs in .env file! See: .env.sample.");

export default function App() {
  return <Redirect href="/products" />;
}
