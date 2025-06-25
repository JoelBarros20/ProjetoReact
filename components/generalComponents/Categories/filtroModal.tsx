import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Modal from "react-native-modal";

import styles from '@/app/styles/ComponentsStyles/Categories/filtroModal';

const { height } = Dimensions.get('window');

type Option = { key: string; label: string };

type FilterModalProps = {
    visible: boolean;
    toggleModal: () => void;
    clearFilters: () => void;

    featuresOptionsArray: Option[];
    featuresOptionAtual: string;
    setfeaturesOptionsFunction: (value: string) => void;

    numberOfSeatsArray: Option[];
    numberOfSeatAtual: string;
    setNumberOfSeatsFunction: (value: string) => void;

    fuelOptionsArray: Option[];
    fuelOptionAtual: string;
    setFuelOptionsFunction: (value: string) => void;

    doorsOptionsArray?: Option[];
    doorOptionAtual?: string;
    setDoorOptionsFunction: (value: string) => void;

    onApplyFilters: () => void;
};

export default function FilterModal({
    visible,
    toggleModal,
    clearFilters,
    featuresOptionsArray,
    featuresOptionAtual,
    setNumberOfSeatsFunction,
    numberOfSeatsArray,
    numberOfSeatAtual,
    fuelOptionAtual,
    fuelOptionsArray,
    setFuelOptionsFunction,
    doorOptionAtual,
    doorsOptionsArray,
    setDoorOptionsFunction,
    setfeaturesOptionsFunction,
    onApplyFilters,

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

                {/* Conteúdo do modal */}
                <View style={{ marginTop: height * 0.02 }}>

                    {/* Conteúdo do modal - Extras */}
                    <View>
                        <Text style={[styles.optionText, { fontWeight: 'bold', marginBottom: height * 0.01 }]}>
                            Extras
                        </Text>
                        <FlatList
                            horizontal
                            data={featuresOptionsArray}
                            keyExtractor={(item) => item.key}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.ModalFiltersButtonsContainer}
                            renderItem={({ item }) => {
                                const isActive = featuresOptionAtual === item.key;
                                return (
                                    <TouchableOpacity
                                        style={[styles.ExtrasButton, isActive && styles.ExtrasButtonActive]}
                                        onPress={() => setfeaturesOptionsFunction(featuresOptionAtual === item.key ? '' : item.key)}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                            <Text style={[styles.ExtrasButtonText, isActive && styles.ExtrasButtonTextActive]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
                                                {item.label}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>

                    {/* Conteúdo do modal - Número de Lugares */}
                    <View>
                        <Text style={[styles.optionText, { fontWeight: 'bold', marginBottom: height * 0.01 }]}>
                            Número de lugares
                        </Text>
                        <FlatList
                            horizontal
                            data={numberOfSeatsArray}
                            keyExtractor={(item) => item.key}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.ModalFiltersButtonsContainer}
                            renderItem={({ item }) => {
                                const isActive = numberOfSeatAtual === item.key;
                                return (
                                    <TouchableOpacity
                                        style={[styles.SeatsButton, isActive && styles.SeatsButtonActive]}
                                        onPress={() => setNumberOfSeatsFunction(numberOfSeatAtual === item.key ? '' : item.key)}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                            <Text style={[styles.SeatsButtonText, isActive && styles.SeatsButtonTextActive]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
                                                {item.label}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>

                    {/* Conteúdo do modal - Combustível */}
                    <View>
                        <Text style={[styles.optionText, { fontWeight: 'bold', marginBottom: height * 0.01 }]}>
                            Combustível
                        </Text>
                        <FlatList
                            horizontal
                            data={fuelOptionsArray}
                            keyExtractor={(item) => item.key}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.ModalFiltersButtonsContainer}
                            renderItem={({ item }) => {
                                const isActive = fuelOptionAtual === item.key;
                                return (
                                    <TouchableOpacity
                                        style={[styles.FuelsButton, isActive && styles.FuelsButtonActive]}
                                        onPress={() => setFuelOptionsFunction(fuelOptionAtual === item.key ? '' : item.key)}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                            <Text style={[styles.FuelsButtonText, isActive && styles.FuelsButtonTextActive]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
                                                {item.label}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>

                    {/* Conteúdo do modal - Número de Portas */}
                    <View>
                        <Text style={[styles.optionText, { fontWeight: 'bold', marginBottom: height * 0.01 }]}>
                            Portas
                        </Text>
                        <FlatList
                            horizontal
                            data={doorsOptionsArray}
                            keyExtractor={(item) => item.key}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.ModalFiltersButtonsContainer}
                            renderItem={({ item }) => {
                                const isActive = doorOptionAtual === item.key;
                                return (
                                    <TouchableOpacity
                                        style={[styles.DoorsButton, isActive && styles.DoorsButtonActive]}
                                        onPress={() => setDoorOptionsFunction(doorOptionAtual === item.key ? '' : item.key)}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                            <Text style={[styles.DoorsButtonText, isActive && styles.DoorsButtonTextActive]} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
                                                {item.label}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </View>

                {/* Botão para aplicar os filtros do modal */}
                <View style={styles.ViewContainerApplyFilters}>
                    <TouchableOpacity
                        style={styles.ContainerButtonApplyFilters}
                        onPress={() => {
                            onApplyFilters();
                            toggleModal();
                        }}
                    >
                        <Text style={styles.TextButtonApplyFilters}>Aplicar filtros</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
    );
}
