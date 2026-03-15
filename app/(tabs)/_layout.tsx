import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5C7A4E',
        tabBarStyle: {
          backgroundColor: '#FAFAF7',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="addrecipe"
        options={{
          title: 'Add Recipe',
        }}
      />
    </Tabs>
  );
}