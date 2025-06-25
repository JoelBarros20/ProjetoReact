import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import styles from '@/app/styles/ComponentsStyles/Categories/filtrosSuperiores';

type TransmissionOption = {
    key: string;
    label: string;
    icon: keyof typeof MaterialIcons.glyphMap;
};

type TransmissionFilterProps = {
    options: TransmissionOption[];
    onSelect: (key: string) => void;
    selectedKey: string;
};

export default function TransmissionFilterRow({
    options,
    onSelect,
    selectedKey,
}: TransmissionFilterProps) {

    const [isScrolling, setIsScrolling] = useState(false);

    return (
        <FlatList data={options} keyExtractor={(item) => item.key} horizontal
            onScrollBeginDrag={() => setIsScrolling(true)}
            onScrollEndDrag={() => setIsScrolling(false)}
            onMomentumScrollEnd={() => setIsScrolling(false)}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ gap: 10 }}
            ListHeaderComponent={<View />}
            renderItem={({ item }) => {
                const isSelected = selectedKey === item.key;
                return (
                    <View onStartShouldSetResponder={() => !isScrolling}>
                        <TouchableOpacity
                            style={[
                                // cor de fundo quando selecionado
                                styles.ContainerButtonFiltersTop,
                                isSelected && {
                                    backgroundColor: '#fff',
                                    borderColor: '#b30000',
                                    borderWidth: 1,

                                }
                            ]}
                            disabled={isScrolling}
                            onPress={() => onSelect(item.key)}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <MaterialIcons
                                    name={item.icon}
                                    size={18}
                                    // ícone branco se selecionado, azul se não
                                    color={isSelected ? '#000' : '#fff'}
                                />
                                <Text style={[
                                    styles.TextButtonFilters,
                                    // texto branco e bold se selecionado
                                    isSelected && { color: '#000' }
                                ]}>
                                    {item.label}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            }}
        />
    );
}
