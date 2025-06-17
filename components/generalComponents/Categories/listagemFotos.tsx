import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';

import styles from '@/app/styles/ComponentsStyles/Categories/listagemFotos';

const { height } = Dimensions.get('window');

type Vehicle = {
    id: number;
    photo_url: string;
    base_price_day: number;
    brand_name: string;
    model_name: string;
    category_name: string;
};

type FilterModalProps = {
    photo_url: Vehicle[];
    BASE_URL: string;
    from?: string;
};

export default function FilterModal({ photo_url, BASE_URL, from }: FilterModalProps) {

    const router = useRouter();

    return (
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: height * 0.3, width: '100%' }}
                bounces={false}
                scrollEnabled={true}
                overScrollMode="never"
            >
                {photo_url.map((img, index) => {
                    const imageUrl = img.photo_url.startsWith('http')
                        ? img.photo_url
                        : `${BASE_URL}${img.photo_url}`;
                    if (!img.photo_url || typeof img.photo_url !== 'string' || !img.photo_url.trim()) {
                        return null;
                    }
                    return (
                        <View key={index} style={styles.ContainerCards}>
                            <Image source={{ uri: imageUrl }} style={styles.Image} resizeMode="cover" />
                            <View style={{ paddingHorizontal: 10, paddingTop: 8, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>{img.brand_name}</Text>
                                <View style={{ width: 4 }} />
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>{img.model_name}</Text>
                            </View>
                            <View style={{ paddingHorizontal: 10, paddingTop: 2, flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, color: '#999' }}>{img.category_name}</Text>
                            </View>
                            <View style={styles.ContainerInsideCard}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>€{img.base_price_day}</Text>
                                <TouchableOpacity
                                    style={styles.ContainerInsideButton}
                                    onPress={() => router.push({
                                        pathname: '/stack/viaturasdetalhes',
                                        params: {
                                            imageUrl: imageUrl,
                                            nome: 'Peugeot 208', // ou img.nome se existir
                                            descricao: 'ou Similar | Económico', // ou img.descricao se existir
                                            preco: '150.00', // ou img.preco se existir
                                            from,
                                        }
                                    })}
                                >
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ver</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}
