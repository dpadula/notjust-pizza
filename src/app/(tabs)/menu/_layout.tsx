import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import React from 'react';
import { Pressable, useColorScheme } from 'react-native';

const MenuLayout = () => {
  const colorScheme = useColorScheme();
  return (
    <Stack
      screenOptions={{
        title: 'Menu',
        headerRight: () => (
          <Link href='/cart' asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name='shopping-cart'
                  size={25}
                  color={Colors[colorScheme ?? 'light'].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    ></Stack>
  );
};

export default MenuLayout;
