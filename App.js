import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateAccountScreen from './app/screens/CreateAccountScreen';
import LandingScreen from './app/screens/LandingScreen';
import ProfileScreen from './app/screens/ProfileScreen';
import NewBestieScreen from './app/screens/NewBestieScreen';
import MotivationScreen from './app/screens/MotivationScreen';
import EditProfileScreen from './app/screens/EditProfileScreen';
import { useState } from 'react';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import * as SQLite from 'expo-sqlite';

const Stack = createNativeStackNavigator();

export default function App() {
  let [loggedin, setloggedin] = useState(false)
  if (loggedin){
    return (
      <NavigationContainer>
        <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="LandingScreen">
          <Stack.Screen
            name="LandingScreen"
            component={LandingScreen}
          />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="NewBestieScreen" component={NewBestieScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    
    );
  }
  else{
    return (
      <NavigationContainer>
          <Stack.Navigator 
          screenOptions={{
            headerShown: false
          }}
          initialRouteName="WelcomeScreen">
            <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
            />
          <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="LandingScreen" component={LandingScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="NewBestieScreen" component={NewBestieScreen} />
          <Stack.Screen name="MotivationScreen" component={MotivationScreen} />
          <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
