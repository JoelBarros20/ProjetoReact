import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/OutrasPaginas/LoginScreenStyles';
import BackgroundSVG from '../assets/svgs/login_layout.svg';
import { ScrollView } from 'react-native';
import { API_ROUTES } from '@/env';

const { width, height } = Dimensions.get('window');

export default function Signin() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [loading] = useState(false);

    // Faz a leitura das fontes da aplicação
    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    });

    if (!fontsLoaded || loading) {
        return null;
    }

    // Caso o utilizador não preencha os campos todos, surge um aviso
    const handleLogin = async () => {
        if (!name || !email || !password || !password_confirmation) {
            alert("Preencha todos os campos");
            return;
        }

        // Ligação à API para realizar a criação da conta do utilizador
        try {
            const response = await fetch(API_ROUTES.SIGNIN, { //URL da rota que cria utilizadores
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation,
                })
            });

            const data = await response.json();

            // Caso exista sucesso na criação da conta do utilizador
            if (response.ok) {
                console.log("Registo bem-sucedido:", data);

                const token = data.token;
                if (token) {
                    await AsyncStorage.setItem('token', token); //Após criar a conta, gera o token do utilizador
                    await AsyncStorage.setItem('lastRoute', 'homepage'); // Após criar a conta, leva diretamente para a Homepage
                    router.replace("/(drawer)/homepage");
                } else {
                    console.error("Token não encontrado na resposta da API:", data);
                    alert("Erro ao obter token de autenticação");
                }

            } else {
                alert(data.message || "Registo inválido");
            }
        } catch (error) {
            console.error("Erro ao conectar com a API:", error);
            alert("Erro ao conectar com o servidor");
        }
    };

    // Conteúdo apresentado na página de Sign In
    return (
        <View style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                <ImageBackground source={require('../assets/images/login_image.jpg')} style={styles.backgroundImage}>
                    <BackgroundSVG width={width} height={height * 0.85} style={styles.svgBackground} />
                </ImageBackground>

                <View style={styles.content}>
                    <Text style={styles.title}>Dont' have an account?</Text>
                    <Text style={styles.subtitle}>Create one</Text>

                    <Text style={styles.label}>Name</Text>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="person" size={20} color="#aaa" style={styles.icon} />
                        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
                    </View>

                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="email" size={20} color="#aaa" style={styles.icon} />
                        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
                    </View>

                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock" size={20} color="#aaa" style={styles.icon} />
                        <TextInput style={styles.input} placeholder="Password" secureTextEntry={secureText} value={password} onChangeText={setPassword} />
                        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                            <MaterialIcons name={secureText ? "visibility-off" : "visibility"} size={20} color="#aaa" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Password confirmation</Text>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock" size={20} color="#aaa" style={styles.icon} />
                        <TextInput style={styles.input} placeholder="Password confirmation" secureTextEntry={secureText} value={password_confirmation}
                            onChangeText={setPassword_confirmation} />

                        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                            <MaterialIcons name={secureText ? "visibility-off" : "visibility"} size={20} color="#aaa" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleLogin} style={styles.loginButtonContainer}>
                        <LinearGradient colors={["#444", "#222"]} style={styles.loginButton}>
                            <Text style={styles.loginText}>Create account</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/login')}>
                        <Text style={styles.signupText}>Already have an account? <Text style={styles.signupLink}>Login</Text></Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{ height: 10, paddingBottom: 10 }}></View>
        </View>
    );
}