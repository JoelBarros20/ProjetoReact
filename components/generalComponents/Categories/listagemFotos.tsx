import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';

import styles from '@/app/styles/ComponentsStyles/Categories/listagemFotos';

const { height } = Dimensions.get('window');

type Vehicle = {
    id: number;
    image_url: string;
};

type FilterModalProps = {
    images: Vehicle[];
    BASE_URL: string;
};

export default function FilterModal({ images, BASE_URL }: FilterModalProps) {
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
                {images.map((img, index) => {
                    const imageUrl = `${BASE_URL}${img.image_url}`;
                    return (
                        <View key={index} style={styles.ContainerCards}>
                            <Image source={{ uri: imageUrl }} style={styles.Image} resizeMode="cover" />
                            <View style={{ paddingHorizontal: 10, paddingTop: 8 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>Peugeot 208</Text>
                                <Text style={{ fontSize: 13, color: '#999' }}>ou Similar | Económico</Text>
                            </View>
                            <View style={styles.ContainerInsideCard}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>€150.00</Text>
                                <TouchableOpacity style={styles.ContainerInsideButton}>
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
