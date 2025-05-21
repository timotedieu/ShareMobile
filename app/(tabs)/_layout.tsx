import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1E90FF',
        tabBarInactiveTintColor: '#b0b0b0',
        headerShown: false,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: '#181C24',
          borderTopWidth: 0,
          elevation: 10,
          height: 70,
          paddingBottom: Platform.OS === 'android' ? 12 : 24,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 13,
          marginBottom: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="view"
        options={{
          title: 'Fichiers',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="paperplane.fill" color={color} />,
          href: '/files/view', // Redirige vers la page d'affichage des fichiers si elle existe
        }}
      />
      <Tabs.Screen
        name="share"
        options={{
          title: 'Partager',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="chevron.left.forwardslash.chevron.right" color={color} />
          ),
          href: '/files/share',
        }}
      />
    </Tabs>
  );
}
