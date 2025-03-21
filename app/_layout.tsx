import { StyleSheet } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/authContext';

const _layout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Modal Route Fixed */}
        <Stack.Screen
          name="(modals)/ProfileModal"
          options={{
            presentation: 'modal',
          }}
        />
          <Stack.Screen
          name="(modals)/WalletModal"
          options={{
            presentation: 'modal',
          }}
        />
             <Stack.Screen
          name="(modals)/TransactionModal"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>
    </AuthProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
