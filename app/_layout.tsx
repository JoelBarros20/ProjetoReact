import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { ActivityIndicator, AppState, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const prepare = async () => {
      if (!loaded) return;

      // Verifica se é a primeira execução da sessão
      const sessionFlag = await SecureStore.getItemAsync("session_started");

      if (!sessionFlag) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("lastRoute");
        await SecureStore.setItemAsync("session_started", "true");
      }

      const token = await AsyncStorage.getItem("token");

      console.log("Token:", token);
      //console.log("lastRoute:", lastRoute);

      if (token) {
        setInitialRoute("(drawer)");
      } else {
        setInitialRoute("initial_page");
      }

      await SplashScreen.hideAsync();
    };

    prepare();
  }, [loaded]);

  // Limpa o flag quando a app vai para background
  useEffect(() => {
    const subscription = AppState.addEventListener("change", async (nextAppState) => {
      if (nextAppState === "background") {
        await SecureStore.deleteItemAsync("session_started");
      }
    });
    return () => subscription.remove();
  }, []);

  if (!loaded || initialRoute === null) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          gestureEnabled: false,
        }}
      >
        <Stack.Screen name="(drawer)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signin" />
        <Stack.Screen name="initial_page" />
        <Stack.Screen name="categories" />
        <Stack.Screen name="Stack" />
        <Stack.Screen name="subareascliente" />
        <Stack.Screen name="viaturasdetalhes" />
        <Stack.Screen name="pesquisar_viaturas" />
      </Stack>
    </ThemeProvider>
  );
}
