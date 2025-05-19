import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Platform, UIManager, Image, Animated, Easing, LayoutChangeEvent } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../../app/styles/ComponentsStyles/ReviewReservation/reviewCarDetails';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function VehicleCard() {
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

    return (
        <View style={styles.MainContainer}>
            <View style={styles.SecondContainer}>
                <View style={styles.ThirdContainer}>
                    <Image
                        source={{ uri: 'https://cdn.group.renault.com/ren/master/renault-new-cars/renault-twingo-e-tech-electric/bdc-renault-twingo-e-tech-electric.png' }}
                        style={styles.ImageStyle}
                    />
                    <View>
                        <Text style={styles.TextBold}>Renault Twingo</Text>
                        <Text style={styles.Text}>or similar | MDMR</Text>
                        <Text style={styles.Text}>3 rental days</Text>
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
                )}
            </Animated.View>
        </View>
    );
}
