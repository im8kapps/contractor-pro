import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { DashboardScreen, EstimatesScreen, PhotosScreen, ClientsScreen } from '../screens';
import type { RootTabParamList } from '../types';

const brandBlue = '#2563eb';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: brandBlue,
    background: '#ffffff',
  },
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: brandBlue,
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: () => <Text>🏠</Text>,
          }}
        />
        <Tab.Screen
          name="Estimates"
          component={EstimatesScreen}
          options={{
            tabBarLabel: 'Estimates',
            tabBarIcon: () => <Text>📋</Text>,
          }}
        />
        <Tab.Screen
          name="Photos"
          component={PhotosScreen}
          options={{
            tabBarLabel: 'Photos',
            tabBarIcon: () => <Text>📷</Text>,
          }}
        />
        <Tab.Screen
          name="Clients"
          component={ClientsScreen}
          options={{
            tabBarLabel: 'Clients',
            tabBarIcon: () => <Text>👥</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}