// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import 'react-native-gesture-handler';

import * as React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginPage from './App/Containers/LoginPage/LoginPage';
import RegisterPage from './App/Containers/RegisterPage/RegisterPage';
import Conta from './App/Containers/Conta/Conta';
import SlashPage from './App/Containers/SlashPage/SlashPage';
import InitPage from './App/Containers/InitPage/InitPage';
import ContactPage from './App/Containers/ContactPage/ContactPage';
import ProfilePage from './App/Containers/ProfilePage/ProfilePage';
import MenuPage from './App/Containers/MenuPage/MenuPage';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="ContaScreen"
        component={Conta}
      />

    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        // headerShown: false
        title: 'Contato',
        headerStyle: { backgroundColor: '#a5a3a2' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>

      <Stack.Screen
        name="ContactPageScreen"
        component={ContactPage}
      />
    </Stack.Navigator>
  );
}

function ProfilesStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProfilePageScreen"
      screenOptions={{
        // headerShown: false
        title: 'Meu Perfil',
        headerStyle: { backgroundColor: '#91c8ff' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>


      <Stack.Screen
        name="ProfilePageScreen"
        component={ProfilePage}
      />
    </Stack.Navigator>
  );
}

function MenuStack() {
  return (
    <Stack.Navigator
      initialRouteName="MenuPageScreen"
      screenOptions={{
        // headerShown: false
        title: 'Menu',
        headerStyle: { backgroundColor: '#a5a3a2' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>

      <Stack.Screen
        name="MenuPageScreen"
        component={MenuPage}
      />
    </Stack.Navigator>
  );
}

function HomeNavigator() {
  return (

    <Tab.Navigator
      initialRouteName="HomeStack"
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#000'
      }}>

      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          title: 'My home',
          tabBarLabel: 'Home',
          tabBarStyle: {
            backgroundColor: '#91c8ff'
          },
        
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons 
            name="home" 
            color={color} 
            size={size} />
          ),
        }}
        />

      <Tab.Screen
        name="PerfilStack"
        component={ProfilesStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Perfil',
          tabBarStyle: {
            backgroundColor: '#91c8ff'
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Contato',
          tabBarStyle: {
            backgroundColor: '#91c8ff'
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="contacts"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="MenuStack"
        component={MenuStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Menu',
          tabBarStyle: {
            backgroundColor: '#91c8ff'
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="menu"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName='Splash' ///the name of the initial screen
        screenOptions={{
          headerShown: false,
        }}>

        <Stack.Screen name="Splash" component={SlashPage} />
        <Stack.Screen name="ProfileScreenA" component={InitPage} />
        <Stack.Screen name="LoginPageScreen" component={LoginPage} />
        <Stack.Screen name="RegisterPageScreen" component={RegisterPage} />

        <Stack.Screen
          name="PosLogin"
          component={HomeNavigator}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}


export default App;