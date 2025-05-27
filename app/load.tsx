import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoadScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkRoute = async () => {
      const token = await AsyncStorage.getItem('token');
      const lastRoute = await AsyncStorage.getItem('lastRoute');
      const validRoutes = [
        'homepage',
        'categories',
        'categories/comerciais',
        'categories/economico',
        'categories/intermedio',
        'categories/minivan',
        'categories/premium',
        'categories/suv',
        'categories/desportivos',
        'viaturasdetalhes',
        'subareascliente/clientereservas',
        'subareascliente/historicoreservas',
      ];

      if (token && lastRoute && validRoutes.includes(lastRoute)) {
        router.push(`/(drawer)/${lastRoute}` as any);
      } else {
        await AsyncStorage.removeItem('lastRoute'); // evita reuso inválido
        router.push('/initial_page');
      }
    };

    checkRoute();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
