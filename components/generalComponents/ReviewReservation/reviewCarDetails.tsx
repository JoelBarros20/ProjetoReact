import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Platform, UIManager, Image, Animated, Easing } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../../app/styles/ComponentsStyles/ReviewReservation/reviewCarDetails';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function VehicleCard() {
    const [expanded, setExpanded] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleExpanded = () => {
        const toValue = expanded ? 0 : 1;
        setExpanded(!expanded);

        Animated.timing(animation, {
            toValue,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
        }).start();
    };

    // Interpolação da altura e opacidade
    const heightInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 250], // altura máxima estimada do conteúdo expandido
    });

    const opacityInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    return (
        <View style={styles.cardContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        source={{ uri: 'https://cdn.group.renault.com/ren/master/renault-new-cars/renault-twingo-e-tech-electric/bdc-renault-twingo-e-tech-electric.png' }}
                        style={{ width: 70, height: 70, borderRadius: 12, marginRight: 12 }}
                    />
                    <View>
                        <Text style={{ color: '#000', fontWeight: 'bold' }}>Renault Twingo</Text>
                        <Text style={{ color: '#000' }}>or similar | MDMR</Text>
                        <Text style={{ color: '#000' }}>3 rental days</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={toggleExpanded}>
                    <FontAwesome name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Conteúdo animado */}
            <Animated.View style={{ height: heightInterpolate, overflow: 'hidden', opacity: opacityInterpolate, marginTop: 16 }}>
                <View style={{ borderTopWidth: 1, borderTopColor: '#444', paddingTop: 12 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                        <MaterialCommunityIcons name="store-marker" size={20} color="#000" style={{ marginRight: 8 }} />
                        <View>
                            <Text style={{ color: '#000' }}>Pickup</Text>
                            <Text style={{ color: '#000' }}>Viseu</Text>
                            <Text style={{ color: '#000' }}>Thu 15/05/2025, 12:00 PM</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                        <MaterialCommunityIcons name="store-marker" size={20} color="#000" style={{ marginRight: 8 }} />
                        <View>
                            <Text style={{ color: '#000' }}>Return</Text>
                            <Text style={{ color: '#000' }}>Viseu</Text>
                            <Text style={{ color: '#000' }}>Sun 18/05/2025, 12:00 PM</Text>
                        </View>
                    </View>

                    <Text style={{ color: '#000', fontWeight: 'bold' }}>Payment option</Text>
                    <Text style={{ color: '#000', marginBottom: 12 }}>
                        Stay flexible - Pay at pick-up, free cancellation and rebooking any time before pick-up time
                    </Text>

                    <Text style={{ color: '#000', fontWeight: 'bold' }}>Included as standard</Text>
                    <Text style={{ color: '#000', marginBottom: 12 }}>Third party insurance</Text>

                    <Text style={{ color: '#000', fontWeight: 'bold' }}>Mileage</Text>
                    <Text style={{ color: '#000', marginBottom: 12 }}>Unlimited kilometers</Text>

                    <Text style={{ color: '#000', fontWeight: 'bold' }}>Protection</Text>
                    <Text style={{ color: '#000' }}>All Inclusive Protection - No deductible</Text>
                </View>
            </Animated.View>
        </View>
    );
}
