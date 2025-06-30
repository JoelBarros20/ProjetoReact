import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import styles from '@/app/styles/ComponentsStyles/ReviewReservation/CustomerDetails'

type CustomerDetailsProps = {
    customerData?: {
        name?: string;
        address?: string;
        contact_email?: string;
        country?: string;
        city?: string;
        phone?: string;
    };
};

export default function CustomerDetails({ customerData }: CustomerDetailsProps) {
    if (!customerData) return null;
    return (
        <View>
            <Text>Nome Completo</Text>
            <TextInput
                style={styles.input}
                value={customerData.name || ''}
                editable={false}
                placeholder="Nome completo"
                placeholderTextColor="#999"
            />
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                value={customerData.contact_email || ''}
                editable={false}
                placeholder="Email"
                placeholderTextColor="#999"
            />
            <Text>Morada</Text>
            <TextInput
                style={styles.input}
                value={customerData.address || ''}
                editable={false}
                placeholder="Morada"
                placeholderTextColor="#999"
            />
            <Text>Cidade</Text>
            <TextInput
                style={styles.input}
                value={customerData.city || ''}
                editable={false}
                placeholder="Cidade"
                placeholderTextColor="#999"
            />
            <Text>Telefone</Text>
            <TextInput
                style={styles.input}
                value={customerData.phone || ''}
                editable={false}
                placeholder="Telefone"
                placeholderTextColor="#999"
            />
        </View>
    );
}
