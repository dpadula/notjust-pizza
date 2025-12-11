import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import Colors from '@/constants/Colors';
import { useAuth } from '../../providers/AuthProvider';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    // If the user is authenticated, redirect to the main app
    return <Redirect href='/' />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveTintColor: 'gainsboro',
        tabBarStyle: {
          backgroundColor: Colors.light.tint,
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      {/* Con esto evitamos que el tab "index" aparezca en la barra de tabs */}
      <Tabs.Screen
        name='index'
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name='menu'
        options={{
          title: 'Menu',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='cutlery' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='orders'
        options={{
          headerShown: false,
          title: 'Orders',
          tabBarIcon: ({ color }) => <TabBarIcon name='list' color={color} />,
        }}
      />
      <Tabs.Screen
        name='signout'
        options={{
          headerShown: false,
          title: 'Sign out',
          tabBarIcon: ({ color }) => <TabBarIcon name='list' color={color} />,
        }}
      />
    </Tabs>
  );
}
