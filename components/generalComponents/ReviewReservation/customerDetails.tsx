import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import styles from '@/app/styles/ComponentsStyles/ReviewReservation/CustomerDetails'

export default function CustomerDetails() {

    const router = useRouter();

    return (
        <View>
            <Text style={styles.sectionTitle}>Detalhes do Condutor</Text>

            <View style={styles.inlineGroup}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Primeiro Nome</Text>
                    <TextInput style={styles.input} value="Joel" placeholderTextColor="#999" />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Último Nome</Text>
                    <TextInput style={styles.input} value="Barros" placeholderTextColor="#999" />
                </View>
            </View>

            <View style={styles.fieldBlock}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} value='' placeholderTextColor="#999" />
            </View>

            <View style={styles.fieldBlock}>
                <Text style={styles.label}>Morada</Text>
                <TextInput style={styles.input} value='' placeholderTextColor="#999" />
            </View>

            <View style={styles.inlineGroup}>

                <View style={{ flex: 1 }}>
                    <Text style={styles.label}> País </Text>
                    <TextInput style={styles.input} placeholderTextColor="#999" />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Cidade</Text>
                    <TextInput style={styles.input} placeholderTextColor="#999" />

                </View>

            </View>
            <View style={styles.fieldBlock}>
                <Text style={styles.label}>Número de Telefone</Text>
                <TextInput style={styles.input} value='' placeholderTextColor="#999" />
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.ContainerButtonOffers}
                    onPress={() => router.push('../payments/confirmpayments')}>
                    <Text style={styles.ButtonOfertas}>Reservar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}