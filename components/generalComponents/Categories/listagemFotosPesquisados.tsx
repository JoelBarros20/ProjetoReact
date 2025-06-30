import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';

import styles from '@/app/styles/ComponentsStyles/Categories/listagemFotosPesquisados';

const { height } = Dimensions.get('window');

type Vehicle = {
    id: number;
    photo_url: string;
    base_price_day: number;
    base_price_month?: number;
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

    function calcularMesesEDias(dataInicio: string, dataFim: string) {
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        const diffTime = fim.getTime() - inicio.getTime();
        const totalDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        const meses = Math.floor(totalDias / 30);
        const dias = totalDias % 30;
        return { meses, dias, totalDias };
    }

    function calcularPrecoTotal(veiculo: Vehicle, dataInicio: string, dataFim: string) {
        const { meses, dias, totalDias } = calcularMesesEDias(dataInicio, dataFim);
        if (totalDias < 30) {
            return totalDias * veiculo.base_price_day;
        } else {
            // Usa o preço mensal real e o preço diário real
            return (meses * (veiculo.base_price_month ?? 0)) + (dias * veiculo.base_price_day);
        }
    }

    function validarDatas(dataInicio?: string, dataFim?: string) {
        if (!dataInicio || !dataFim) return { valido: false, mensagem: 'Selecione as datas.' };
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);

        if (inicio < hoje) {
            return { valido: false, mensagem: 'A data de levantamento não pode ser inferior à data de hoje.' };
        }
        if (fim < inicio) {
            return { valido: false, mensagem: 'A data de entrega não pode ser inferior à data de levantamento.' };
        }
        return { valido: true, mensagem: '' };
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

                    const { valido, mensagem } = validarDatas(dataInicio, dataFim);
                    const precoTotal = valido
                        ? calcularPrecoTotal(img, dataInicio!, dataFim!)
                        : img.base_price_day ?? 0;

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
                                {dataInicio && dataFim && (
                                    valido ? (
                                        <View style={{ marginTop: 9 }}>
                                            <Text style={{ fontSize: 20, fontWeight: '500' }}>
                                                Valor da reserva €{precoTotal}
                                            </Text>
                                        </View>
                                    ) : (
                                        <View style={{ marginTop: 9 }}>
                                            <Text style={{ fontSize: 16, color: 'red' }}>
                                                {mensagem}
                                            </Text>
                                        </View>
                                    )
                                )}

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 4 }}>
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
                                                    from: fromSearch ? from : `categories/${categorySlug}`,
                                                    fromSearch: fromSearch ? 'true' : 'false',
                                                    dataInicio,
                                                    horaInicio,
                                                    dataFim,
                                                    horaFim,
                                                    selectedStand,
                                                    doors: img.door ?? '',
                                                }
                                            });
                                        }}
                                    >
                                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ver</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    );
                })}
            </ScrollView >
        </View >
    );
}
