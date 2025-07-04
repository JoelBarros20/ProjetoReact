import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Dimensions, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { API_ROUTES } from '@/env';
import { SafeAreaView } from 'react-native-safe-area-context';

import SideMenu from '@/components/generalComponents/Menu/SideMenu';
import BackgroundSVG from '@/assets/svgs/login_layout.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

import styles from '@/app/styles/OutrasPaginas/LoginScreenStyles';

const { width, height } = Dimensions.get('window');

SplashScreen.preventAutoHideAsync();

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading] = useState(false);

  // Caso o utilizador não preencha os campos todos, surge um aviso
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Erro', "Preencha todos os campos");
      return;
    }

    // Ligação à API para realizar o login com os valores da DB
    try {
      const response = await fetch(API_ROUTES.LOGIN, { //URL da rota de Login
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: username,
          password: password
        })
      });

      const data = await response.json();

      // Caso exista sucesso no login, o utilizador avança
      if (response.ok) {
        console.log("Login bem-sucedido:", data);
        const token = data["Token do Customer Logado"];
        console.log("Resposta completa da API:", data);

        // Verifica a existência de token
        if (token) {
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('lastRoute', 'homepage');
          await AsyncStorage.setItem('userId', String(data["Customer Logado"].id));
          const savedToken = await AsyncStorage.getItem('token');
          const userId = await AsyncStorage.getItem('userId');
          console.log("Id do Utilizador:", userId);
          console.log("Token guardado localmente:", savedToken);
          router.replace("/(drawer)/homepage"); // Caso o token seja verificado avança para a Homepage
        } else {
          console.error("Token não encontrado na resposta da API:", data);
          alert("Erro ao obter token de autenticação");
        }

        // Caso o login esteja incorreto, mostra a mensagem de erro
      } else {
        alert(data.message || "Login inválido");
      }
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      alert("Erro ao conectar com o servidor");
    }
  };

  // Faz a leitura das fontes da aplicação
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded || loading) {
    return null;
  }

  // Conteúdo apresentado na página de Login
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }} edges={['left', 'right', 'bottom']}>
      <ImageBackground source={require('@/assets/images/login_image.jpg')}
        style={styles.backgroundImage}>
        <BackgroundSVG width={width} height={height * 0.85} style={styles.svgBackground} />
        <View style={{ top: 45, left: 20, zIndex: 10 }}>
          <SideMenu />
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo à</Text>
        <Text style={styles.title}>Car Rent</Text>
        <Text style={styles.subtitle}>Faça login na sua conta</Text>

        <Text style={styles.label}>Username</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={20} color="#aaa" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} color="#aaa" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry={secureText} value={password} onChangeText={setPassword} />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <MaterialIcons name={secureText ? "visibility-off" : "visibility"} size={20} color="#aaa" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.loginButtonContainer}>
          <LinearGradient colors={["#444", "#222"]} style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}