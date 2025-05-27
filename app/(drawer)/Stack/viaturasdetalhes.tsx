import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

import styles from '@/app/styles/OutrasPaginas/ViaturasDetalhes'

export default function ViaturasDetalhesScreen() {

  const router = useRouter();
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.backgroundImage}>

        {/* Menu lateral */}
        <View style={styles.Menu}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <MaterialIcons name="menu" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.spacer} />
      </View>

      {/* Imagem */}
      <Image source={{ uri: 'https://cdn.group.renault.com/ren/master/renault-new-cars/renault-twingo-e-tech-electric/bdc-renault-twingo-e-tech-electric.png' }}
        style={styles.carImage}
        resizeMode="contain"
      />

      {/* Detalhes da Viatura */}
      <View style={styles.infoSection}>
        <Text style={styles.title}>Nome da Viatura</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.subtitle}>Uma descrição da viatura</Text>
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
            <MaterialIcons name="badge" size={18} color={'#FFF'} />
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
          <Text style={styles.sectionTitle}>190.00</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.ContainerButtonOffers}
            onPress={() => router.push('/(drawer)/Stack/seguro')}
          >
            <Text style={styles.ButtonOfertas}>Reservar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView >
  );
}
