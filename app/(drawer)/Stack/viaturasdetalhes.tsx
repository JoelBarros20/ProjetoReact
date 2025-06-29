import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import SideMenu from '@/components/generalComponents/Menu/SideMenu';
import { BASE_URL } from '@/env';

import styles from '@/app/styles/OutrasPaginas/ViaturasDetalhes'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ViaturasDetalhesScreen() {

  const params = useLocalSearchParams();
  const from = Array.isArray(params.from) ? params.from[0] : params.from;
  const fromSearch = Array.isArray(params.fromSearch) ? params.fromSearch[0] : params.fromSearch;

  const imageBase64 = params.imageBase64 as string
  const brand_name = params.brand_name as string || 'Dados Viatura';
  const model_name = params.model_name as string || 'Dados Viatura';
  const category_name = params.category_name as string || 'Dados Viatura';
  const base_price_day = params.base_price_day as string || 'Dados Viatura';
  const base_price_month = params.base_price_month as string || 'Dados Viatura';
  const fuel = params.fuel as string || 'Dados Viatura';
  const transmission = params.transmission as string || 'Dados Viatura';
  const capacity = params.capacity as string || 'Dados Viatura';
  const doors = params.doors as string || 'Dados Viatura';
  const stand_name = params.stand_name as string || 'Dados Viatura';
  const dataInicio = params.dataInicio as string | undefined;
  const horaInicio = params.horaInicio as string | undefined;
  const dataFim = params.dataFim as string | undefined;
  const horaFim = params.horaFim as string | undefined;

  console.log("Parâmetros recebidos:", params); // <-- Adiciona esta linha

  const podeReservar = !!dataInicio && !!horaInicio && !!dataFim && !!horaFim;

  let featuresArray: string[] = [];
  if (typeof params.features === 'string') {
    featuresArray = JSON.parse(params.features);
  } else if (Array.isArray(params.features)) {
    featuresArray = params.features;
  }

  const router = useRouter();

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

  const photo_url = params.photo_url as string;
  const imageUrl = photo_url?.startsWith('http')
    ? photo_url
    : `${BASE_URL}${photo_url}`;


  function calcularDias(dataInicio?: string, dataFim?: string) {
    if (!dataInicio || !dataFim) return 0;
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    const diffTime = fim.getTime() - inicio.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }

  function calcularPrecoTotal(base_price_day: number, base_price_month: number, dataInicio?: string, dataFim?: string) {
    const dias = calcularDias(dataInicio, dataFim);
    if (!dataInicio || !dataFim || dias < 1) return null;
    if (dias < 30) {
      return dias * base_price_day;
    } else {
      return base_price_month;
    }
  }

  const precoTotal = calcularPrecoTotal(Number(base_price_day), Number(base_price_month), dataInicio, dataFim);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['left', 'right']}>
      <ScrollView style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 200, flexGrow: 1 }}>

        {/* Menu lateral */}
        <View style={styles.ContainerMenu}>
          <SideMenu iconColor='#000' from={from} fromSearch={fromSearch} />
        </View>

        {/* Imagem */}
        <Image source={{ uri: imageBase64 }}
          style={{ width: '100%', height: '40%' }}
          resizeMode="cover"
        />

        {/* Detalhes da Viatura */}
        <View style={styles.infoSection}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.title}>{brand_name}</Text>
            <Text style={[styles.title, { marginLeft: 1 }]}> {model_name}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.subtitle}> {category_name}</Text>
          </View>
          <View>
            <Text style={styles.optionTitle}> Especificações</Text>
          </View>
          <View style={styles.specsContainer}>
            <View style={styles.specItem}>
              <Ionicons name="person" size={18} color={'#111'} />
              <Text style={styles.specText}>Nº de passageiros: {capacity}</Text>
            </View>
            <View style={styles.specItem}>
              <MaterialIcons name="local-gas-station" size={18} color={'#111'} />
              <Text style={styles.specText}>Combustivel: {fuelMap[fuel] || fuel}</Text>
            </View>
            <View style={styles.specItem}>
              <MaterialCommunityIcons name="car-door" size={18} color="black" />
              <Text style={styles.specText}>{doors} Portas </Text>
            </View>
            <View style={styles.specItem}>
              <MaterialCommunityIcons name="car-shift-pattern" size={18} color={'#111'} />
              <Text style={styles.specText}>Tipo de transmissão {transmissionMap[transmission] || transmission}</Text>
            </View>
            <View style={styles.specItem}>
              <MaterialIcons name="location-city" size={18} color="black" />
              <Text style={styles.specText}>{stand_name}</Text>
            </View>
          </View>

          <View style={{ marginTop: 16, paddingHorizontal: 4 }}>
            <Text style={styles.optionTitle}>Extras</Text>
            <View style={{ flexDirection: 'column', padding: 2 }}>
              {featuresArray.length > 0 && featuresArray[0] !== 'Dados Viatura'
                ? featuresArray.map((feature, idx) => (
                  <View
                    key={idx}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 16,
                      paddingVertical: 4,
                      marginBottom: 8,
                    }}
                  >
                    <Ionicons name="checkmark-circle" size={16} color="#111" style={{ marginRight: 8 }} />
                    <Text style={styles.specText}>{feature}</Text>
                  </View>
                ))
                : null}
            </View>
          </View>
        </View>
      </ScrollView >
      {/* Secção do Preço da Viatura */}
      <View style={styles.sectionBox}>
        {podeReservar ? (
          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>Preço da reserva:</Text>
            <Text style={styles.sectionTitle}>
              {calcularPrecoTotal(Number(base_price_day), Number(base_price_month), dataInicio, dataFim)}€
            </Text>
          </View>
        ) : (
          <>
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              <Text style={styles.sectionTitle}>Preço Diário:</Text>
              <Text style={styles.sectionTitle}>{base_price_day}€</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.sectionTitle}>Preço Mensal:</Text>
              <Text style={styles.sectionTitle}>{base_price_month}€</Text>
            </View>
          </>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.ContainerButtonOffers}
            onPress={() => {
              if (podeReservar) {
                // Avança para o processo de reserva
                router.push({
                  pathname: '/stack/seguro',
                  params: {
                    ...params,
                    id: params.id,
                    dataInicio,
                    horaInicio,
                    dataFim,
                    horaFim,
                    precoTotal: precoTotal?.toString(),
                  }
                });
              } else {
                // Redireciona para a homepage para preencher datas
                router.replace('/homepage');
              }
            }}
          >
            <Text style={styles.ButtonOfertas}>
              {podeReservar ? 'Reservar' : 'Realizar Marcação'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
