import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Button from '../../components/Button';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../providers/AuthProvider';

const signout = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Button
        text='Sign out'
        onPress={() => {
          console.log('ADMIN');
          supabase.auth.signOut();
        }}
      />
    </View>
  );
};

export default signout;

const styles = StyleSheet.create({});
