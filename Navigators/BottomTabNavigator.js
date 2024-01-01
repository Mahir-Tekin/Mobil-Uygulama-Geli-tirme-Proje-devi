
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MyRooms from '../screens/MyRooms';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="MyRooms" component={MyRooms} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
