import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import Review from '../screens/Review';
import SplashScreen from '../screens/SplashScreen';
import { SafeAreaView, Image, StyleSheet, View } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        header: () => (
          <SafeAreaView style={styles.header}>
            <Image
              source={require('../assets/Filmae.jpeg')} // Atualize o caminho, se necessário
              style={styles.logo}
            />
          </SafeAreaView>
        ),
        tabBarActiveTintColor: '#FCA311',
        tabBarInactiveTintColor: '#fff',
        tabBarActiveBackgroundColor: '#13213C',
        tabBarInactiveBackgroundColor: '#13213C',
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Review"
        component={Review}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="fire" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="MainApp" component={TabNavigator} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 70,
    backgroundColor: '#10192E',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
});
