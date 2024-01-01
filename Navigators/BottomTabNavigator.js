import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Veya tercih ettiğiniz ikon seti
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MyRooms from '../screens/MyRooms';
import Profile from '../screens/Profile';

const Tab = createMaterialBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#694fad' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Anasayfa',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favoriler',
          tabBarIcon: ({ color }) => (
            <Icon name="heart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MyRooms"
        component={MyRooms}
        options={{
          tabBarLabel: 'Odalarım',
          tabBarIcon: ({ color }) => (
            <Icon name="bed" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profilim',
          tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;