import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";

import SideMenu from "@/components/generalComponents/Menu/SideMenu";
import { API_ROUTES } from "@/env";

import styles from "@/app/styles/Payments/Insurance";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function SeguroPage() {

    const [options, setOptions] = useState<any[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetch(API_ROUTES.INSURANCES)
            .then(res => res.json())
            .then(data => setOptions(data))
            .catch(err => {
                setOptions([]);
                // Podes mostrar um erro ao utilizador se quiseres
            });
    }, []);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}} edges={['left', 'right']}>
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <ScrollView contentContainerStyle={{ padding: width * 0.05, paddingBottom: height * 0.15 }}>
                    <SideMenu iconColor="#000" />
                    <Text style={styles.title}>Escolha um seguro à sua medida</Text>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            style={[
                                styles.card,
                                selected === option.id && { borderColor: "#b30000", borderWidth: 2 }
                            ]}
                            onPress={() => setSelected(option.id)}
                            activeOpacity={0.8}
                        >
                            <View style={styles.row}>
                                <View style={styles.radioCircle}>
                                    {selected === option.id && <View style={styles.radioSelected} />}
                                </View>
                                <Text style={styles.cardTitle}>{option.name}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.price}>
                                    {option.value && parseFloat(option.value) > 0
                                        ? `${parseFloat(option.value).toFixed(2)} €`
                                        : "Incluído"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={styles.footer}>
                    <View style={styles.row}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>91,99 €</Text>
                    </View>
                    <TouchableOpacity style={styles.continueButton}
                        onPress={() => router.push('/stack/confirmpayments')} >
                        <Text style={styles.continueText}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </View >
        </SafeAreaView>
    );
}
