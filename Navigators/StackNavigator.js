
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import BottomTabNavigator from './BottomTabNavigator';
import AdminBottomTabNavigator from './AdminBottomTabNavigator';
import AddHotelScreen from '../screens/AddHotelsScreen';
import EditHotelScreen from '../screens/EditHotelScreen';
import RoomsScreen from '../screens/RoomsScreen';
import AddRoomScreen from '../screens/AddRoomScreen';


const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Admin" component={AdminBottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="AddHotelScreen" component={AddHotelScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditHotelScreen" component={EditHotelScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RoomsScreen" component={RoomsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddRoomScreen" component={AddRoomScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
