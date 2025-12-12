import { Redirect, Stack } from 'expo-router';
import 'react-native-reanimated';

import { useAuth } from '@/providers/AuthProvider';

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    // If the user is authenticated, redirect to the main app
    return <Redirect href={'/'} />;
  }

  return <Stack />;
}
