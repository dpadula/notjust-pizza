import { Stack } from 'expo-router';
import React from 'react';

const MenuLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Menu' }} />
    </Stack>
  );
};

export default MenuLayout;
