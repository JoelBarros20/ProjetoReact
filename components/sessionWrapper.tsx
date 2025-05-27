import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  children: ReactNode;
};

export default function SessionWrapper({ children }: Props) {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const check = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        router.replace('/login');
      }
      setIsChecking(false);
    };
    check();
  }, []);

  if (isChecking) return null;

  return (
    <>
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: insets.top ,
        backgroundColor: '#000',
        zIndex: 100,
      }} pointerEvents="none" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }} edges={['top', 'left', 'right', 'bottom']}>
        {children}
      </SafeAreaView>
    </>
  );
}
