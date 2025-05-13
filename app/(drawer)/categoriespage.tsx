import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import styles from '../styles/OutrasPaginas/CategoriesPage';

const categories = [
    { key: '1', label: 'Comerciais', icon: 'local-shipping', iconLib: 'MaterialIcons', route: 'categories/comerciais' },
    { key: '2', label: 'Económico', icon: 'attach-money', iconLib: 'MaterialIcons', route: 'categories/economico' },
    { key: '3', label: 'Intermédio', icon: 'directions-car', iconLib: 'MaterialIcons', route: 'categories/intermedio' },
    { key: '4', label: 'Minivan', icon: 'airport-shuttle', iconLib: 'MaterialIcons', route: 'categories/minivan' },
    { key: '5', label: 'SUV', icon: 'car-lifted-pickup', iconLib: 'MaterialCommunityIcons', route: 'categories/suv' },
    { key: '6', label: 'Desportivo', icon: 'car-sport', iconLib: 'Ionicons', route: 'categories/desportivos' },
    { key: '7', label: 'Premium', icon: 'workspace-premium', iconLib: 'MaterialIcons', route: 'categories/premium' },
];

export default function CategoriesGrid() {

    const navigation = useNavigation();

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
                <FlatList data={categories} numColumns={2} keyExtractor={(item) => item.key} contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }: any) => {
                        const IconComponent = item.iconLib === 'MaterialCommunityIcons' ? MaterialCommunityIcons : item.iconLib === 'Ionicons'
                            ? Ionicons
                            : MaterialIcons;

                        return (
                            <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate(item.route as never)} >
                                <IconComponent name={item.icon} size={40} color="#b30000" />
                                <Text style={styles.gridText}>{item.label}</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
}

