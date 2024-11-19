import Perfil from "../screens/Perfil";
import Home from "../screens/Home";
import Review from "../screens/Review";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FCA311",
        tabBarInactiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#13213C",
        tabBarInactiveBackgroundColor: "#13213C",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="home" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Feather name="user" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Review"
        component={Review}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialCommunityIcons name="fire" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
