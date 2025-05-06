import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function LoadScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkRoute = async () => {
      const token = await AsyncStorage.getItem('token');
      const lastRoute = await AsyncStorage.getItem('lastRoute');

      if (token && lastRoute && lastRoute !== "login") {
        router.replace(`/(drawer)/${lastRoute}`as any);
      } else {
        router.replace("/initial_page");
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
