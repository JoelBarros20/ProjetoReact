import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import styles from '../../styles/Payments/ReviewReservation'
import VehicleCard from '../../../components/generalComponents/ReviewReservation/reviewCarDetails';
import CustomerDetails from '../../../components/generalComponents/ReviewReservation/customerDetails';
import SideMenu from '@/components/generalComponents/Menu/SideMenu';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ReviewAndBook() {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }} edges={['left', 'right', 'bottom']}>
            <ScrollView bounces={false} contentContainerStyle={{ paddingBottom: 30 }}>
                <View style={styles.HeaderPage}>
                    <SideMenu />
                    <Text style={styles.title}>Detalhes da Reserva</Text>
                    <View style={styles.spacer} />
                </View>
                <View style={{ paddingHorizontal: width * 0.04 }}>
                    <VehicleCard />
                    <View>
                        <CustomerDetails />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

