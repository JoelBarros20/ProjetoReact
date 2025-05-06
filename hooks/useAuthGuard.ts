import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAuthGuard() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      try {

        await new Promise((resolve) => setTimeout(resolve, 300));

        const token = await AsyncStorage.getItem('token');
        console.log("Token no useAuthGuard:", token);

        if (!token) {
          router.replace('/login');
        }
      } catch (error) {
        console.error('Erro ao verificar token:', error);
      } finally {

        setChecking(false);
      }
    };

    verify();
  }, []);

  return checking;
}
