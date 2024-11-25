import { NavigationContainer } from "@react-navigation/native";
import Routes from "./routes";
import { StatusBar } from "react-native";

export default function App() {
  return (

    <NavigationContainer>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
};

