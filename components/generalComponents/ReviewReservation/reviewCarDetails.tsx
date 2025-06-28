import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Platform, UIManager, Image, Animated, Easing, LayoutChangeEvent, Dimensions } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

import styles from '@/app/styles/ComponentsStyles/ReviewReservation/reviewCarDetails';
import { ScrollView } from 'react-native-gesture-handler';

type VehicleCardProps = {
    brand_name: string;
    model_name: string;
    doors?: string;
    capacity?: string;
    transmission?: string;
    imageBase64: string;
    category_name?: string;
    insurance_value?: string;
    insurance_name?: string;
    fuel?: string;
    dataInicio: string;
    horaInicio: string;
    features?: string[];
    dataFim: string;
    horaFim: string;
    stand_name: string;
    totalComSeguro?: string;
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width, height } = Dimensions.get("window");

export default function VehicleCard(props: VehicleCardProps) {
    const [expanded, setExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleExpanded = () => {
        const toValue = expanded ? 0 : contentHeight;

        Animated.timing(animation, {
            toValue,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false, // necessário para animar height
        }).start();

        setExpanded(!expanded);
    };

    function calcularDias(dataInicio: string, dataFim: string) {
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        const diffTime = fim.getTime() - inicio.getTime();
        // +1 para incluir o dia de início
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }

    const diasReserva = calcularDias(props.dataInicio, props.dataFim);

    return (
        <View style={styles.MainContainer}>
            <ScrollView>
                <View style={styles.SecondContainer}>
                    <View style={[styles.ThirdContainer, { marginBottom: 10 }]}>
                        <Image source={{ uri: props.imageBase64 }} style={{
                            width: width * 0.25,
                            height: width * 0.25,
                            borderRadius: width * 0.03,
                            marginRight: width * 0.03,
                        }} />
                        <View>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: width * 0.05 }}>{props.brand_name} {props.model_name}</Text>
                            <Text style={{ color: '#000', fontSize: width * 0.04 }}>{props.category_name}</Text>
                            <View style={{ marginBottom: 35 }}></View>
                            <Text style={{ color: '#000', fontSize: width * 0.04 }}>Reserva de {diasReserva} dias</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={toggleExpanded}>
                        <FontAwesome name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color="#000" />
                    </TouchableOpacity>
                </View>

                <Animated.View style={{ height: animation, overflow: 'hidden' }}>
                    <View
                        style={[styles.AnimatedContainer, { position: 'absolute', top: 0, left: 0, right: 0, opacity: 0 }]}
                        onLayout={(e: LayoutChangeEvent) => setContentHeight(e.nativeEvent.layout.height)}
                    >
                        {/* Medimos a altura aqui mas está invisível */}
                        <View>
                            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                                <MaterialCommunityIcons name="store-marker" size={20} color="#000" style={{ marginRight: 8 }} />
                                <View>
                                    <Text style={styles.Text}>Pickup</Text>
                                    <Text style={styles.Text}>Viseu</Text>
                                    <Text style={styles.Text}>Thu 15/05/2025, 12:00 PM</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                                <MaterialCommunityIcons name="store-marker" size={20} color="#000" style={{ marginRight: 8 }} />
                                <View>
                                    <Text style={styles.Text}>Return</Text>
                                    <Text style={styles.Text}>Viseu</Text>
                                    <Text style={styles.Text}>Sun 18/05/2025, 12:00 PM</Text>
                                </View>
                            </View>

                            <Text style={styles.TextBold}>Payment option</Text>
                            <Text style={styles.TextMargin}>
                                Stay flexible - Pay at pick-up, free cancellation and rebooking any time before pick-up time
                            </Text>

                            <Text style={styles.TextBold}>Included as standard</Text>
                            <Text style={styles.TextMargin}>Third party insurance</Text>

                            <Text style={styles.TextBold}>Mileage</Text>
                            <Text style={styles.TextMargin}>Unlimited kilometers</Text>

                            <Text style={styles.TextBold}>Protection</Text>
                            <Text style={styles.Text}>All Inclusive Protection - No deductible</Text>
                        </View>
                    </View>

                    {/* Conteúdo real que será mostrado */}
                    {expanded && (
                        <View style={styles.AnimatedContainer}>
                            <ScrollView
                                style={{ maxHeight: height * 0.4 }} // limita a altura do scroll
                                contentContainerStyle={{ paddingBottom: 16 }}
                                showsVerticalScrollIndicator={true}
                            >
                                <Text style={styles.TextBold}>Detalhes da reserva</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 8, marginTop: 8 }}>

                                    <MaterialCommunityIcons name="store-marker" size={20} color="#000" style={{ marginRight: 8 }} />
                                    <View>

                                        <Text style={styles.Text}>Local de Levantamento </Text>
                                        <Text style={styles.Text}>{props.stand_name}</Text>
                                        <Text style={styles.Text}>{props.dataInicio} - {props.horaInicio}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                                    <MaterialCommunityIcons name="store-marker" size={20} color="#000" style={{ marginRight: 8 }} />
                                    <View>
                                        <Text style={styles.Text}>Local de Entrega</Text>
                                        <Text style={styles.Text}>{props.stand_name}</Text>
                                        <Text style={styles.Text}>{props.dataFim} - {props.horaFim}</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 3 }}></View>
                                <Text style={styles.TextBold}>Detalhes da viatura</Text>
                                <View style={{ marginBottom: 3, marginTop: 3 }}>
                                    <Text style={styles.Text}>Nº de passageiros: {props.capacity}</Text>
                                </View>
                                <View style={{ marginBottom: 3 }}>
                                    <Text style={styles.Text}>Combustível: {props.fuel}</Text>
                                </View>
                                <View style={{ marginBottom: 3 }}>
                                    <Text style={styles.Text}>Nº de Portas: {props.doors}</Text>
                                </View>
                                <View style={{ marginBottom: 3 }}>
                                    <Text style={styles.Text}>Tipo de transmissão: Caixa {props.transmission}</Text>
                                </View>

                                {props.features && props.features.length > 0 && (
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Extras:</Text>
                                        {props.features.map((feature, idx) => (
                                            <Text key={idx} style={{ color: '#333', marginBottom: 3 }}>• {feature}</Text>
                                        ))}
                                    </View>
                                )}
                                <View style={{ marginTop: 10 }}></View>
                                <Text style={styles.TextBold}>Seguro</Text>
                                <Text style={styles.TextMargin}>{props.insurance_name} - {props.insurance_value}€</Text>

                            </ScrollView>
                        </View>
                    )}

                </Animated.View>
            </ScrollView>
        </View >
    );
}
