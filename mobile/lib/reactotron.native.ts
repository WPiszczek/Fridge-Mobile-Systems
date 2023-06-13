import Reactotron from "reactotron-react-native";
import { NativeModules } from "react-native";

if (__DEV__) {
  const hostname = NativeModules.SourceCode.scriptURL
    .split("://")[1] // Remove the scheme
    .split("/")[0] // Remove the path
    .split(":")[0]; // Remove the port

  Reactotron.configure({ host: hostname }).useReactNative().connect();
}
