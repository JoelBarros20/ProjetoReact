import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import styles from '../../app/styles/Drawer';
import { useDrawerStatus } from '@react-navigation/drawer';

export default function CustomDrawerContent(props: any) {

    const [showCategories, setShowCategories] = useState(false);
    const [showSubAreas, setShowSubAreas] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;
    const animationSubAreas = useRef(new Animated.Value(0)).current;
    const status = useDrawerStatus();

    const categorias = ['Comerciais', 'Economico', 'Intermedio', 'Minivan', 'SUV', 'Premium', 'Desportivo'];
    const subareas = ['Minhas Reservas', 'Histórico de Reservas'];
    const router = useRouter();

    const categoriaSlugs = {
        Comerciais: 'categories/comerciais',
        Economico: 'categories/economico',
        Intermedio: 'categories/intermedio',
        Minivan: 'categories/minivan',
        SUV: 'categories/suv',
        Premium: 'categories/premium',
        Desportivo: 'categories/desportivos'
    } as const;

    const subareasSlugs = {
        'Minhas Reservas': 'subareascliente/clientereservas',
        'Histórico de Reservas': 'subareascliente/historicoreservas',
    } as const;

    const toggleAccordion = () => {
        const finalValue = showCategories ? 0 : categorias.length * 40;
        Animated.timing(animation, { toValue: finalValue, duration: 200, useNativeDriver: false, easing: Easing.out(Easing.ease) }).start();
        setShowCategories(!showCategories);
    };

    const toggleSubAreas = () => {
        const finalValue = showSubAreas ? 0 : subareas.length * 40;
        Animated.timing(animationSubAreas, { toValue: finalValue, duration: 200, useNativeDriver: false, easing: Easing.out(Easing.ease) }).start();
        setShowSubAreas(!showSubAreas);
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            router.replace('/login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const getCategoriaIcon = (cat: string) => {
        switch (cat) {
            case 'Comerciais': return <MaterialIcons name="local-shipping" size={18} color="#fff" />;
            case 'Economico': return <MaterialIcons name="attach-money" size={18} color="#fff" />;
            case 'Intermedio': return <MaterialIcons name="directions-car" size={18} color="#fff" />;
            case 'Minivan': return <MaterialIcons name="airport-shuttle" size={18} color="#fff" />;
            case 'SUV': return <MaterialCommunityIcons name="car-lifted-pickup" size={18} color="#fff" />;
            case 'Premium': return <MaterialIcons name="workspace-premium" size={18} color="#fff" />;
            case 'Desportivo': return <Ionicons name="car-sport" size={18} color="#fff" />;
            default: return null;
        }
    };

    useEffect(() => {
        if (status === 'closed') {
            setShowCategories(false);
            setShowSubAreas(false);
            Animated.timing(animation, { toValue: 0, duration: 200, useNativeDriver: false }).start();
            Animated.timing(animationSubAreas, { toValue: 0, duration: 200, useNativeDriver: false }).start();
        }
    }, [status]);

    return (
        <BlurView intensity={80} tint="dark" style={{ flex: 1 }}>
            <View style={styles.DrawerContent}>
                <View style={styles.ContainerImage}>
                    <Image source={{ uri: 'https://randomuser.me/api/portraits/women/1.jpg' }} style={styles.Image} />
                    <Text style={styles.TextImage}>Utilizador</Text>
                </View>

                <TouchableOpacity onPress={handleLogout} style={styles.containerButtonIcon}>
                    <Ionicons name="log-out-outline" size={22} color="#fff" style={styles.ButtonLogout} />
                    <Text style={styles.ButtonText}>Log out</Text>
                </TouchableOpacity>
            </View>

            <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
                <View style={{ marginTop: 5, marginLeft: -5 }}>
                    <DrawerItem label="Homepage" icon={() => <Feather name="home" size={20} color="#fff" />}
                        labelStyle={{ color: '#fff' }}
                        onPress={() => {
                            props.navigation.navigate('homepage');
                        }}
                    />

                    <TouchableOpacity onPress={toggleAccordion} style={styles.AccordionStyle}>
                        <MaterialIcons name="category" size={20} color="#fff" />
                        <Text style={styles.CategoryIcon}>Categorias</Text>
                        <Ionicons name={showCategories ? 'chevron-up' : 'chevron-down'} size={20} color="#fff" />
                    </TouchableOpacity>

                    <Animated.View style={{ paddingLeft: 60, overflow: 'hidden', height: animation }}>
                        {categorias.map((cat, index) => (
                            <TouchableOpacity key={index} onPress={() => {
                                router.push(categoriaSlugs[cat as keyof typeof categoriaSlugs] as any);
                            }}
                                style={{ paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                {getCategoriaIcon(cat)}
                                <Text style={{ color: '#fff', fontSize: 14 }}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </Animated.View>

                    <TouchableOpacity onPress={toggleSubAreas} style={styles.AccordionStyle}>
                        <MaterialIcons name="person" size={20} color="#fff" />
                        <Text style={styles.CategoryIcon}>Área Cliente</Text>
                        <Ionicons name={showSubAreas ? 'chevron-up' : 'chevron-down'} size={20} color="#fff" />
                    </TouchableOpacity>

                    <Animated.View style={{ paddingLeft: 60, overflow: 'hidden', height: animationSubAreas }}>
                        {subareas.map((sub, index) => {
                            const icon = sub === 'Minhas Reservas'
                                ? <MaterialIcons name="event-note" size={18} color="#fff" />
                                : <Ionicons name="book" size={18} color="#fff" />;
                            return (
                                <TouchableOpacity key={index} onPress={() => {
                                    router.push(subareasSlugs[sub as keyof typeof subareasSlugs] as any);
                                }}
                                    style={{ paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                    {icon}
                                    <Text style={{ color: '#fff', fontSize: 14 }}>{sub}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </Animated.View>
                </View>
            </DrawerContentScrollView>
        </BlurView>
    );
}
