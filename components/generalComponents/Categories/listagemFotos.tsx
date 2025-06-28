import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';

import styles from '@/app/styles/ComponentsStyles/Categories/listagemFotos';

const { height } = Dimensions.get('window');

type Vehicle = {
    id: number;
    photo_url: string;
    base_price_day: number;
    door: number;
    brand_name: string;
    model_name: string;
    category_name: string;
    features?: string[] | number[];
};

type FilterModalProps = {
    photo_url: Vehicle[];
    BASE_URL: string;
    from?: string;
    fromSearch?: boolean;
    onPressDetalhes?: (tem: any) => void;
    dataInicio?: string;
    horaInicio?: string;
    dataFim?: string;
    horaFim?: string;
    selectedStand?: string;
};

export default function FilterModal({ photo_url, BASE_URL, from, fromSearch, dataInicio, dataFim, horaFim, horaInicio, selectedStand }: FilterModalProps) {

    const router = useRouter();

    const categoryMap: Record<string, string> = {
        Comercial: "comerciais",
        Comerciais: "comerciais",
        SUV: "suv",
        Suv: "suv",
        Premium: "premium",
        Minivan: "minivan",
        Intermédio: "intermedio",
        Desportivo: "desportivos",
        Económico: "economico",
        // Adiciona outros conforme necessário
    };


    function calcularDias(dataInicio: string, dataFim: string) {
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        // +1 para incluir o dia de início
        const diffTime = fim.getTime() - inicio.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays;
    }

    function calcularPrecoTotal(veiculo: any, dataInicio: string, dataFim: string) {
        const dias = calcularDias(dataInicio, dataFim);
        if (dias < 30) {
            return dias * veiculo.base_price_day;
        } else {
            return veiculo.base_price_month;
        }
    }

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
                    const precoTotal =
                        dataInicio && dataFim
                            ? calcularPrecoTotal(img, dataInicio, dataFim)
                            : 0;
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
                                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                                    €{precoTotal}
                                </Text>
                                <TouchableOpacity
                                    style={styles.ContainerInsideButton}
                                    onPress={() => {
                                        const categoryKey = img.category_name;
                                        const categorySlug = categoryMap[categoryKey] || categoryKey.toLowerCase();
                                        router.push({
                                            pathname: '/stack/viaturasdetalhes',
                                            params: {
                                                ...img,
                                                imageBase64: img.photo_url,
                                                features: JSON.stringify(img.features ?? []),
                                                from: fromSearch ? from : `categories/${categorySlug}`, // <-- esta linha!
                                                fromSearch: fromSearch ? 'true' : 'false',
                                                dataInicio,
                                                horaInicio,
                                                dataFim,
                                                horaFim,
                                                selectedStand
                                            }
                                        });
                                    }}
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
