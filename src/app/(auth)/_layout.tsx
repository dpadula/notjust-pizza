import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Redirect, Stack } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { useAuth } from '@/providers/AuthProvider';

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  const { session } = useAuth();

  if (session) {
    // If the user is authenticated, redirect to the main app
    return <Redirect href='/' />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name='sign-in' />
        <Stack.Screen name='sign-up' />
      </Stack>
    </ThemeProvider>
  );
}
