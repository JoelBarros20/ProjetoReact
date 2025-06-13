import React, { useState, useEffect, useRef } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, ImageBackground, Text, ScrollView, Image, Dimensions, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { API_ROUTES, BASE_URL } from '@/env';
import { FlatList } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useAuthGuard from '@/hooks/useAuthGuard';
import DatePickers from '@/components/generalComponents/homepage/DatePicker'
import CustomDrawer from '@/components/CustomMenu/CustomMenu';

import * as SplashScreen from 'expo-splash-screen';

import styles from '@/app/styles/OutrasPaginas/Homepage';

SplashScreen.preventAutoHideAsync();

type VehicleImage = {
    id: number;
    image_url: string;
};

const { width, height } = Dimensions.get('window');

export default function HomePageScreen() {

    const router = useRouter();

    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    });

    const [loading] = useState(false);
    const navigation = useNavigation();
    const checkingToken = useAuthGuard();
    const [dataInicio, setDataInicio] = useState<string | null>(null);
    const [dataFim, setDataFim] = useState<string | null>(null);
    const [horaInicio, setHoraInicio] = useState<string | null>(null);
    const [horaFim, setHoraFim] = useState<string | null>(null);
    const [pickerType, setPickerType] = useState<'inicio' | 'fim' | 'horaInicio' | 'horaFim' | null>(null);
    const [images, setImages] = useState<VehicleImage[]>([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const insets = useSafeAreaInsets();

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const [drawerOpen, setDrawerOpen] = useState(false);

        return `${hours}:${minutes}`;
    };

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const handleConfirm = (selectedDate: Date) => {
        if (pickerType === 'inicio') {
            setDataInicio(formatDate(selectedDate));
        } else if (pickerType === 'fim') {
            setDataFim(formatDate(selectedDate));
        } else if (pickerType === 'horaInicio') {
            setHoraInicio(formatTime(selectedDate));
        } else if (pickerType === 'horaFim') {
            setHoraFim(formatTime(selectedDate));
        }
        setPickerType(null);
    };

    useEffect(() => {
        fetch(API_ROUTES.IMAGES)
            .then(res => res.json())
            .then((data) => {
                setImages(data);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        if (!fontsLoaded || loading || checkingToken) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            fadeAnim.setValue(0);
        }
    }, [fontsLoaded, loading, checkingToken]);

    if (!fontsLoaded || loading || checkingToken) {
        return (
            <Animated.View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    opacity: fadeAnim,
                }}
            >
                <ActivityIndicator size="large" color="#000" />
            </Animated.View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>

            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: insets.bottom,
                    flexGrow: 1,
                    minHeight: height,
                    backgroundColor: "#FFF",
                }}
                style={{ backgroundColor: "#FFF", flex: 1 }}
                bounces={false}
                overScrollMode="never">

                <ImageBackground source={require('@/assets/images/login_image.jpg')} style={styles.backgroundImage} blurRadius={8}>
                    <LinearGradient colors={['#00000000', '#00000079']} style={styles.LinearGradient}>
                        <Text style={styles.TextTitle}>Aluguer de carros</Text>
                        <Text style={styles.TextSubtitle}>Ótimos carros a ótimos preços</Text>
                        <View style={styles.ContainerInputs}>
                            <DatePickers />
                        </View>
                    </LinearGradient>
                </ImageBackground>

                <View style={styles.ContainerOffers}>
                    <View style={{ marginTop: 5 }}>
                        <Text style={styles.TextOffers}>Veiculos</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.ContainerButtonOffers}
                            onPress={() => { router.push('/(drawer)/categories/categoriespage') }} >
                            <Text style={styles.ButtonOfertas}>Ver</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 16 }}>
                    <FlatList data={images} keyExtractor={(item) => item.id.toString()} horizontal showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: 16, paddingBottom: 16 }}
                        renderItem={({ item }) => {
                            const imageUrl = `${BASE_URL}${item.image_url}`;
                            return (
                                <View style={styles.ContainerCards}>
                                    <Image source={{ uri: imageUrl }} style={styles.Image} resizeMode="cover" />
                                    <View style={{ paddingHorizontal: 10, paddingTop: 8 }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>Peugeot 208</Text>
                                        <Text style={{ fontSize: 13, color: '#999' }}>ou Similar | Económico</Text>
                                    </View>
                                    <View style={styles.ContainerInsideCard}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>€150.00</Text>
                                        <TouchableOpacity
                                            style={styles.ContainerInsideButton}
                                            onPress={() => router.push({
                                                pathname: '/(drawer)/Stack/viaturasdetalhes',
                                                params: {
                                                    imageUrl: imageUrl,
                                                    nome: 'Peugeot 208', // ou item.nome se tiver
                                                    descricao: 'ou Similar | Económico', // ou item.descricao se tiver
                                                    preco: '150.00', // ou item.preco se tiver
                                                }
                                            })}
                                        >
                                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ver</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>

                <View style={styles.Menu}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <MaterialIcons name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View >
    );
}


