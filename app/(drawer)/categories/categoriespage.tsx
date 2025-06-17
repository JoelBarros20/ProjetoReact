import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ROUTES } from '@/env';

import styles from '@/app/styles/OutrasPaginas/CategoriesPage';

export default function CategoriesGrid() {

    const navigation = useNavigation();
    const router = useRouter();

    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const categoriaSlugs: Record<string, string> = {
        comercial: 'comerciais',
        comerciais: 'comerciais',
        economico: 'economico',
        económico: 'economico',
        intermedio: 'intermedio',
        intermédio: 'intermedio',
        minivan: 'minivan',
        suv: 'suv',
        premium: 'premium',
        desportivo: 'desportivos',
        desportivos: 'desportivos'
    };


 useEffect(() => {
    fetch(API_ROUTES.CATEGORIES)
        .then(res => res.json())
        .then(data => {
            // Se data for array de strings, converte para objetos
            let categoriesArray = data;
            if (Array.isArray(data) && typeof data[0] === 'string') {
                categoriesArray = data.map((name: string, idx: number) => ({
                    id: idx + 1,
                    nome: name
                }));
            }
            setCategories(categoriesArray);
            setLoading(false); // <- Não esqueça de parar o loading!
        })
        .catch(() => setLoading(false));
}, []);

    const getIconComponent = (categoryName: string) => {
        if (!categoryName) {
            return <MaterialIcons name="category" size={40} color="#b30000" />;
        }
        switch (categoryName.toLowerCase()) {
            case 'comercial':
                return <MaterialIcons name="local-shipping" size={40} color="#b30000" />;
            case 'económico':
            case 'economico':
                return <MaterialIcons name="attach-money" size={40} color="#b30000" />;
            case 'intermédio':
            case 'intermedio':
                return <MaterialIcons name="directions-car" size={40} color="#b30000" />;
            case 'minivan':
                return <MaterialIcons name="airport-shuttle" size={40} color="#b30000" />;
            case 'suv':
                return <MaterialCommunityIcons name="car-lifted-pickup" size={40} color="#b30000" />;
            case 'desportivos':
                return <Ionicons name="car-sport" size={40} color="#b30000" />;
            case 'premium':
                return <MaterialIcons name="workspace-premium" size={40} color="#b30000" />;
            default:
                return <MaterialIcons name="category" size={40} color="#b30000" />;
        }
    };

    return (
        <View style={styles.Container}>
            <View style={styles.backgroundImage}>
                <View style={styles.Menu}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <MaterialIcons name="menu" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.Title}>Escolha uma Categoria</Text>
                <View style={styles.spacer} />
            </View>
            {/* Grid com os blocos*/}
            <View style={styles.gridContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#b30000" />
                ) : (
                    <FlatList
                        data={categories}
                        numColumns={2}
                        keyExtractor={(item, index) => item.id ? String(item.id) : `noid-${index}`}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        renderItem={({ item }: any) => (
                            <TouchableOpacity
                                style={styles.gridItem}
                                onPress={async () => {
                                    const raw =
                                        (item.slug || item.nome || item.name || item.id)
                                            .toString()
                                            .toLowerCase()
                                            .normalize('NFD')
                                            .replace(/[\u0300-\u036f]/g, '');
                                    const page = categoriaSlugs[raw] || raw;
                                    await AsyncStorage.setItem('lastRoute', `/categories/${page}`);
                                    router.push(`/categories/${page}` as any);
                                }}
                            >
                                {getIconComponent(item.nome || item.name)}
                                <Text style={styles.gridText}>{item.nome || item.name || 'Sem nome'}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
        </View>
    );
}

