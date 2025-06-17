import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import SideMenu from '@/components/generalComponents/Menu/SideMenu';

import styles from '@/app/styles/OutrasPaginas/ViaturasDetalhes'

export default function ViaturasDetalhesScreen() {

  const params = useLocalSearchParams();
  const imageBase64 = params.imageBase64 as string
  const brand_name = params.brand_name as string || 'Nome da Viatura';
  const descricao = params.descricao as string || 'Uma descrição da viatura';
  const preco = params.preco as string || '190.00';
  const from = params.from as string

  const router = useRouter();

  return (

    <ScrollView style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 200 }}>

      {/* Menu lateral */}
      <View style={styles.ContainerMenu}>
        <SideMenu iconColor='#000' from={from} />
      </View>

      {/* Imagem */}
      <Image source={{ uri: imageBase64 }}
        style={{ width: '100%', height: '40%' }}
        resizeMode="cover"
      />

      {/* Detalhes da Viatura */}
      <View style={styles.infoSection}>
        <Text style={styles.title}>{brand_name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.subtitle}>{descricao}</Text>
          <Text style={styles.subtitle}> | </Text>
          <Text style={styles.subtitle}> Categoria da viatura</Text>
        </View>
        <View>
          <Text style={styles.optionTitle}> Especificações e Extras</Text>
        </View>
        <View style={styles.specsContainer}>
          <View style={styles.specItem}>
            <Ionicons name="person" size={18} color={'#111'} />
            <Text style={styles.specText}>Dados Viatura</Text>
          </View>
          <View style={styles.specItem}>
            <MaterialIcons name="local-gas-station" size={18} color={'#111'} />
            <Text style={styles.specText}>Dados Viatura</Text>
          </View>
          <View style={styles.specItem}>
            <Ionicons name="bag" size={18} color={'#111'} />
            <Text style={styles.specText}>Dados Viatura</Text>
          </View>
          <View style={styles.specItem}>
            <MaterialCommunityIcons name="car-shift-pattern" size={18} color={'#111'} />
            <Text style={styles.specText}>Dados Viatura</Text>
          </View>
          <View style={styles.specItem}>
            <MaterialIcons name="badge" size={18} color={'#111'} />
            <Text style={styles.specText}>Dados Viatura</Text>
          </View>
          <View style={styles.specItem}>
            <Ionicons name="person" size={18} color={'#111'} />
            <Text style={styles.specText}>Dados Viatura</Text>
          </View>
          <View style={styles.specItem}>
            <Ionicons name="person" size={18} color={'#111'} />
            <Text style={styles.specText}>Dados Viatura</Text>
          </View>
          <View style={styles.specItem}>
            <Ionicons name="person" size={18} color={'#111'} />
            <Text style={styles.specText}>Dados Viatura</Text>
          </View>
          <View style={styles.specItem}>
            <Ionicons name="person" size={18} color={'#111'} />
            <Text style={styles.specText}>Dados Viatura</Text>
          </View>
        </View>
      </View>

      {/* Secção do Preço da VIatura */}
      <View style={styles.sectionBox}>
        <View style={styles.containerPrice}>
          <View>
            <FontAwesome name="euro" size={22} color="#111" />
          </View>
          <Text style={styles.sectionTitle}>{preco}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.ContainerButtonOffers}
            onPress={() => router.push('/stack/seguro')}
          >
            <Text style={styles.ButtonOfertas}>Reservar</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView >
  );
}
