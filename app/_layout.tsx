import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
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
      const lastRoute = await AsyncStorage.getItem("lastRoute");

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
          animation: "none",
        }}
      >
        <Stack.Screen name="(drawer)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signin" />
        <Stack.Screen name="initial_page" />
      </Stack>
    </ThemeProvider>
  );
}
