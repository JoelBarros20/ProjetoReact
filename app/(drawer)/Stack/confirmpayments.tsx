import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import VehicleCard from '@/components/generalComponents/ReviewReservation/reviewCarDetails';
import CustomerDetails from '@/components/generalComponents/ReviewReservation/customerDetails';
import SideMenu from '@/components/generalComponents/Menu/SideMenu';

import styles from '@/app/styles/Payments/ReviewReservation'
import { useRouter } from 'expo-router';
import { API_ROUTES } from '@/env';

const { width } = Dimensions.get('window');

export default function ReviewAndBook() {
    const params = useLocalSearchParams();
    const features = Array.isArray(params.features) ? params.features[0] : params.features;
    const category_name = Array.isArray(params.category_name) ? params.category_name[0] : params.category_name;
    const insurance_name = Array.isArray(params.insurance_name) ? params.insurance_name[0] : params.insurance_name;
    const insurance_value = Array.isArray(params.insurance_value) ? params.insurance_value[0] : params.insurance_value;
    const transmission = Array.isArray(params.transmission) ? params.transmission[0] : params.transmission;
    const door = Array.isArray(params.door) ? params.door[0] : params.door;
    const capacity = Array.isArray(params.capacity) ? params.capacity[0] : params.capacity;
    const fuel = Array.isArray(params.fuel) ? params.fuel[0] : params.fuel;
    const brand_name = Array.isArray(params.brand_name) ? params.brand_name[0] : params.brand_name;
    const model_name = Array.isArray(params.model_name) ? params.model_name[0] : params.model_name;
    const dataInicio = Array.isArray(params.dataInicio) ? params.dataInicio[0] : params.dataInicio;
    const dataFim = Array.isArray(params.dataFim) ? params.dataFim[0] : params.dataFim;
    const selectedInsurance = Array.isArray(params.selectedInsurance) ? params.selectedInsurance[0] : params.selectedInsurance;
    const totalComSeguro = Array.isArray(params.totalComSeguro) ? params.totalComSeguro[0] : params.totalComSeguro;
    const imageBase64 = Array.isArray(params.imageBase64) ? params.imageBase64[0] : params.imageBase64;
    const horaInicio = Array.isArray(params.horaInicio) ? params.horaInicio[0] : params.horaInicio;
    const horaFim = Array.isArray(params.horaFim) ? params.horaFim[0] : params.horaFim;
    const stand_name = Array.isArray(params.stand_name) ? params.stand_name[0] : params.stand_name;
    const id_vehicle = Array.isArray(params.id) ? params.id[0] : params.id;

    const router = useRouter();

    console.log("Parâmetros recebidos:", params); // <-- Adiciona esta linha


    console.log("params", params);
    // ... outros parâmetros que quiseres mostrar

    const fuelMap: Record<string, string> = {
        "1": "Gasolina",
        "2": "Diesel",
        "3": "Etanol",
        "4": "Biodiesel",
        "5": "GNV",
        "6": "Eletricidade"
    };

    const transmissionMap: Record<string, string> = {
        "1": "Manual",
        "2": "Automática"
    };

    let featuresArray: string[] = [];
    if (typeof features === 'string') {
        try {
            featuresArray = JSON.parse(features);
        } catch {
            featuresArray = [];
        }
    } else if (Array.isArray(features)) {
        featuresArray = features;
    }

    function calcularDias(dataInicio: string, dataFim: string) {
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        const diffTime = fim.getTime() - inicio.getTime();
        // +1 para incluir o dia de início
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }

    const total_days = calcularDias(dataInicio, dataFim);

    async function handleReserva() {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                alert('Utilizador não autenticado');
                return;
            }

            const dadosReserva = {
                customer_id: Number(userId),
                vehicle_id: Number(id_vehicle),
                insurance_id: Number(selectedInsurance),
                total_days: total_days,
                pick_up_date: formatDate(dataInicio),
                drop_off_date: formatDate(dataFim),
                pick_up_hour: formatHour(horaInicio),
                drop_off_hour: formatHour(horaFim),
                reservation_code: null
            };

            // console.log('Dados enviados para reserva:', dadosReserva);

            const response = await fetch(API_ROUTES.RESERVE_POST, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(dadosReserva),
            });

            const responseText = await response.text();
            // console.log('Resposta do servidor:', responseText);

            if (response.ok) {
                Alert.alert('Sucesso','Reserva efetuada com sucesso!');
                router.replace({ pathname: '/homepage', params: { reload: Date.now() } });
            } else {
                alert('Erro ao efetuar reserva: ' + responseText);
            }
        } catch (error) {
            console.log('Erro de conexão:', error);
            if (error instanceof Error) {
                alert('Erro de conexão: ' + error.message);
            } else {
                alert('Erro de conexão: ' + String(error));
            }
        }
    }

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${d.getFullYear()}-${month}-${day}`;
    };

    const formatHour = (hourStr: string) => {
        if (hourStr.length === 8) return hourStr;
        if (hourStr.length === 5) return hourStr + ':00';
        return hourStr;
    };

    const [customerData, setCustomerData] = useState<any>(null);

    useEffect(() => {
        async function fetchCustomerData() {
            const userId = await AsyncStorage.getItem('userId');
            if (userId) {
                const response = await fetch(API_ROUTES.CUSTOMER_DETAILS.replace('{id}', userId));
                const data = await response.json();
                setCustomerData(data);
            }
        }
        fetchCustomerData();
    }, []);

    console.log('customerData:', customerData);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }} edges={['left', 'right', 'bottom']}>
            <ScrollView bounces={false} contentContainerStyle={{ paddingBottom: 30 }}>
                <View style={styles.HeaderPage}>
                    <SideMenu />
                    <Text style={styles.title}>Detalhes da Reserva</Text>
                    <View style={styles.spacer} />
                </View>
                <View style={{ paddingHorizontal: width * 0.04 }}>
                    <VehicleCard
                        brand_name={brand_name}
                        model_name={model_name}
                        doors={door}
                        capacity={capacity}
                        imageBase64={imageBase64}
                        dataInicio={dataInicio}
                        horaInicio={horaInicio}
                        insurance_name={insurance_name}
                        insurance_value={insurance_value}
                        category_name={category_name}
                        fuel={fuelMap[fuel] || fuel}
                        transmission={transmissionMap[transmission] || transmission}
                        dataFim={dataFim}
                        horaFim={horaFim}
                        stand_name={stand_name}
                        totalComSeguro={totalComSeguro}
                        features={featuresArray}
                    />
                    <View>
                        {customerData && <CustomerDetails customerData={customerData} />}
                    </View>
                </View>
            </ScrollView>

            <View style={{
                marginBottom: 24,
                padding: 16,
                borderRadius: 10,

            }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    Preço Final: €{totalComSeguro}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.ContainerButtonOffers}
                    onPress={handleReserva}>
                    <Text style={styles.ButtonOfertas}>Reservar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

