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
        <FlatList style={{}} data={options} keyExtractor={(item) => item.key} horizontal
            onScrollBeginDrag={() => setIsScrolling(true)}
            onScrollEndDrag={() => setIsScrolling(false)}
            onMomentumScrollEnd={() => setIsScrolling(false)}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ gap: 10 }}
            ListHeaderComponent={<View style={{ width: 10 }} />}
            renderItem={({ item }) => (
                <View onStartShouldSetResponder={() => !isScrolling}>
                    <TouchableOpacity
                        style={styles.ContainerButtonFiltersTop}
                        disabled={isScrolling}
                        onPress={() => onSelect(item.key)} // <-- Adicione isto!
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <MaterialIcons name={item.icon} size={16} color={'#FFF'} />
                            <Text style={styles.TextButtonFilters}>{item.label}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        />
    );
}
