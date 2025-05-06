import React, { ReactNode, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
};

export default function SessionWrapper({ children }: Props) {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

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
    <SafeAreaView style={{ flex: 1 }}>
      {children}
    </SafeAreaView>
  );
}
