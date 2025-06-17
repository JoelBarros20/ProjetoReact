import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";

import SideMenu from "@/components/generalComponents/Menu/SideMenu";

import styles from "@/app/styles/Payments/Insurance";

const { width, height } = Dimensions.get("window");

const protectionOptions = [
    {
        key: "Seguro_1",
        nome: "Exemplo de Seguro 1",
        preco: 37.66,
    },
    {
        key: "Seguro_2",
        nome: "Exemplo de Seguro 2",
        preco: 50.00,
    },
    {
        key: "Seguro_3",
        nome: "Exemplo de Seguro 3",
        preco: 20.00,
    },
    {
        key: "Seguro_4",
        nome: "Exemplo de Seguro 4",
        preco: 60.00,
    },
    {
        key: "Seguro_5",
        nome: "Exemplo de Seguro 5",
        preco: 70.00,
    },
];

export default function SeguroPage() {
    const [selected, setSelected] = useState<string | null>(null);
    const router = useRouter();

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={{ padding: width * 0.05, paddingBottom: height * 0.15 }}>
                <SideMenu iconColor="#000" />
                <Text style={styles.title}>Escolha um seguro à sua medida</Text>
                {protectionOptions.map((option) => (
                    <TouchableOpacity
                        key={option.key}
                        style={[styles.card, selected === option.key && { borderColor: "#b30000", borderWidth: 2 }]}
                        onPress={() => setSelected(option.key)}
                        activeOpacity={0.8} >
                        <View style={styles.row}>
                            <View style={styles.radioCircle}>
                                {selected === option.key && <View style={styles.radioSelected} />}
                            </View>
                            <Text style={styles.cardTitle}>{option.nome}</Text>
                            <View style={{ flexDirection: "row", marginLeft: width * 0.02 }}>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.price}>
                                {option.preco > 0 ? `${option.preco.toFixed(2)} € / day` : "Included"}
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
    );
}
