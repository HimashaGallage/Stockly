import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator initialRouteName="Splash">
    <Stack.Screen
      name="Splash"
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Main"
      component={TabNavigator}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default StackNavigator;