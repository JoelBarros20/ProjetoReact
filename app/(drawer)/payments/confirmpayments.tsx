import React from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import styles from '../../styles/Payments/ReviewReservation'
import VehicleCard from '../../../components/generalComponents/ReviewReservation/reviewCarDetails';
import CustomerDetails from '../../../components/generalComponents/ReviewReservation/customerDetails';
import { SafeAreaView } from 'react-native-safe-area-context';


const { width } = Dimensions.get('window');

export default function ReviewAndBook() {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1c1c1e' }}>
            <ScrollView style={styles.container} bounces={false} contentContainerStyle={{ paddingBottom: 30 }}>
                <View style={styles.HeaderPage}>
                    <View style={styles.SideMenu}>
                        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <MaterialIcons name="menu" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
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

