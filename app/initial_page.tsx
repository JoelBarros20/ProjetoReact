import React, { useCallback, useEffect, useState } from 'react';
import { useAssets } from 'expo-asset';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/InitialScreen';

export default function WelcomeScreen() {
  const [assets] = useAssets([require("../assets/images/login_image.jpg")]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
  });

  useEffect(() => {
    const checkSession = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        router.replace('/(drawer)/homepage');
      } else {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || !assets || loading) {
    return null;
  }

  console.log("Pagina de Log")

  return (
    <ImageBackground
      source={{ uri: assets[0]?.localUri ?? "" }}
      style={styles.backgroundImage}
      blurRadius={7}
      onLayout={onLayoutRootView}>
      <View style={styles.overlay} />

      <View style={styles.containerLogo}>
        <Image
          source={require('../assets/images/Logotipo.png')}
          style={styles.loginImage}
          resizeMode="contain"
        />

        <View style={styles.textWrapper}>
          <Text style={styles.title}>Welcome to</Text>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        {/* Ao clicar no botão leva o utilizador até à página de Login */}
        <TouchableOpacity onPress={() => router.push('/login')} style={styles.buttonContainer}>
          <LinearGradient colors={['#ffffff99', '#ffffff55']} style={styles.button}>
            <Text style={styles.buttonText}>Log in</Text>
          </LinearGradient>
        </TouchableOpacity>
        {/* Ao clicar no botão leva o utilizador até à página de Sign In */}
        <TouchableOpacity onPress={() => router.push('/signin')} style={styles.buttonContainer}>
          <LinearGradient colors={['#ffffff99', '#ffffff55']} style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
