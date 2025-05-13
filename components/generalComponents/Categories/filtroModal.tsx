import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import Modal from "react-native-modal";
import { MaterialIcons } from '@expo/vector-icons';
import styles from '@/app/styles/ComponentsStyles/Categories/filtroModal';


const { height } = Dimensions.get('window');

type Option = { key: string; label: string };

type FilterModalProps = {
    visible: boolean;
    toggleModal: () => void;
    clearFilters: () => void;

    sortOptions: Option[];
    sortOption: string;
    setSortOption: (value: string) => void;

    featuresOptions: Option[];
    featuresOption: string;
    setfeaturesOptions: (value: string) => void;

    numberOfSeats: Option[];
    numberOfSeat: string;
    setNumberOfSeats: (value: string) => void;

    getFilterIcon: (cat: string, isActive: boolean) => React.ReactNode;
};


export default function FilterModal({
    visible,
    toggleModal,
    clearFilters,
    sortOptions,
    sortOption,
    featuresOption,
    featuresOptions,
    setNumberOfSeats,
    numberOfSeat,
    numberOfSeats,
    setSortOption,
    getFilterIcon,
    setfeaturesOptions

}: FilterModalProps) {

    return (
        <Modal isVisible={visible} style={styles.ModalFilters} backdropTransitionInTiming={200} backdropTransitionOutTiming={200} onBackdropPress={toggleModal}>
            <View style={styles.modalContent}>

                {/* Header do modal */}
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={toggleModal}>
                        <MaterialIcons name="close" size={24} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.modalHeaderTitle}>Filtros</Text>

                    <TouchableOpacity onPress={clearFilters}>
                        <Text style={styles.modalHeaderClearButton}>Limpar</Text>
                    </TouchableOpacity>
                </View>

                {/* Conteúdo do modal - Sort */}
                <View style={{ marginTop: height * 0.02 }}>
                    <Text style={[styles.optionText, { fontWeight: 'bold', marginBottom: height * 0.01 }]}>
                        Visualizar por
                    </Text>
                    <FlatList horizontal data={sortOptions} keyExtractor={(item) => item.key} showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.ModalFiltersButtonsContainer}
                        renderItem={({ item }) => {
                            const isActive = sortOption === item.key;

                            return (
                                <TouchableOpacity style={[styles.sortButton, sortOption === item.key && styles.sortButtonActive]}
                                    onPress={() => setSortOption(item.key)}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                        {getFilterIcon(item.key, isActive)}
                                        <Text style={[styles.sortButtonText, isActive && styles.sortButtonTextActive]} numberOfLines={1} adjustsFontSizeToFit
                                            minimumFontScale={0.8}>
                                            {item.label}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />

                    {/* Conteúdo do modal - Extras */}
                    <Text style={[styles.optionText, { fontWeight: 'bold', marginBottom: height * 0.01 }]}>
                        Extras
                    </Text>
                    <FlatList horizontal data={featuresOptions} keyExtractor={(item) => item.key} showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.ModalFiltersButtonsContainer}
                        renderItem={({ item }) => {
                            const isActive = featuresOption === item.key;

                            return (
                                <TouchableOpacity style={[styles.ExtrasButton, isActive && styles.ExtrasButtonActive]} onPress={() => setfeaturesOptions(item.key)}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                        {getFilterIcon(item.key, isActive)}
                                        <Text style={[styles.ExtrasButtonText, isActive && styles.ExtrasButtonTextActive]} numberOfLines={1} adjustsFontSizeToFit
                                            minimumFontScale={0.8}>
                                            {item.label}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />

                    {/* Conteúdo do modal - Número de Lugares */}
                    <Text style={[styles.optionText, { fontWeight: 'bold', marginBottom: height * 0.01 }]}>
                        Número de lugares
                    </Text>
                    <FlatList horizontal data={numberOfSeats} keyExtractor={(item) => item.key} showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.ModalFiltersButtonsContainer}
                        renderItem={({ item }) => {
                            const isActive = numberOfSeat === item.key;

                            return (
                                <TouchableOpacity style={[styles.SeatsButton, isActive && styles.SeatsButtonActive]} onPress={() => setNumberOfSeats(item.key)}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                        <Text style={[styles.SeatsButtonText, isActive && styles.SeatsButtonTextActive]} numberOfLines={1}
                                            adjustsFontSizeToFit
                                            minimumFontScale={0.8}>
                                            {item.label}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>

                {/* Botão para aplicar os filtros do modal */}
                <View style={styles.ViewContainerApplyFilters}>
                    <TouchableOpacity style={styles.ContainerButtonApplyFilters}>
                        <Text style={styles.TextButtonApplyFilters}>Aplicar filtros</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
    );
}
