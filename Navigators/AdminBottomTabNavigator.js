import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AdminScreen from '../screens/AdminScreen'; 
import FavoritesScreen from '../screens/FavoritesScreen';
import MyRooms from '../screens/MyRooms';
import Profile from '../screens/Profile';

const AdminTab = createMaterialBottomTabNavigator();

function AdminBottomTabNavigator() {
  return (
    <AdminTab.Navigator
      initialRouteName="AdminHome"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#694fad' }}
    >
      <AdminTab.Screen
        name="AdminHome"
        component={AdminScreen}
        options={{
          tabBarLabel: 'Admin Anasayfa',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      
      <AdminTab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favoriler',
          tabBarIcon: ({ color }) => (
            <Icon name="heart" color={color} size={26} />
          ),
        }}
      />
      <AdminTab.Screen
        name="MyRooms"
        component={MyRooms}
        options={{
          tabBarLabel: 'Odalarım',
          tabBarIcon: ({ color }) => (
            <Icon name="bed" color={color} size={26} />
          ),
        }}
      />
      <AdminTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profilim',
          tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={26} />
          ),
        }}
      />
      {/* ... */}
    </AdminTab.Navigator>
  );
}

export default AdminBottomTabNavigator;