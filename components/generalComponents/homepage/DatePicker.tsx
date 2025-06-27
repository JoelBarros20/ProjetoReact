import React, { useState, useEffect, useMemo } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

import { useRouter } from 'expo-router';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { API_ROUTES } from '@/env';

import styles from '@/app/styles/ComponentsStyles/Homepage/DatePicker'

export default function AnimatedPages() {

    const [localizacao, setLocalizacao] = useState('');
    const [dataInicio, setDataInicio] = useState<string | null>(null);
    const [horaInicio, setHoraInicio] = useState<string | null>(null);
    const [dataFim, setDataFim] = useState<string | null>(null);
    const [horaFim, setHoraFim] = useState<string | null>(null);
    const [pickerType, setPickerType] = useState<string | null>(null);
    const [stands, setStands] = useState<{ id: number, name: string }[]>([]);
    const [selectedStand, setSelectedStand] = useState<string>("");


    const router = useRouter();

    const handleConfirm = (selectedDate: Date) => {
        if (pickerType === 'inicio') {
            setDataInicio(formatDate(selectedDate));
        } else if (pickerType === 'fim') {
            setDataFim(formatDate(selectedDate));
        } else if (pickerType === 'horaInicio') {
            setHoraInicio(formatTime(selectedDate));
        } else if (pickerType === 'horaFim') {
            setHoraFim(formatTime(selectedDate));
        }
        setPickerType(null);
    };

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    useEffect(() => {
        fetch(API_ROUTES.STANDS)
            .then(res => res.json())
            .then(data => setStands(data))
            .catch(() => setStands([]));
    }, []);

    // Usa useMemo para garantir que o array só muda quando stands muda
    const standOptions = useMemo(() => [
        { key: '', label: 'Escolha um stand' },
        ...stands.map(stand => ({
            key: String(stand.id),
            label: stand.name,
        })),
    ], [stands]);

    return (
        <View>
            <Text style={styles.FirstTextContainer}>Localização do Stand</Text>
            <View style={[styles.TextInput, { backgroundColor: '#fff', borderRadius: 8, minHeight: 44, justifyContent: 'center' }]}>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedStand(value)}
                    value={selectedStand}
                    placeholder={{ label: 'Escolha um stand', value: '' }}
                    items={stands.map(stand => ({
                        label: stand.name,
                        value: String(stand.id),
                    }))}
                    style={{
                        inputIOS: {
                            backgroundColor: '#fff',
                            borderRadius: 8,
                            height: 44,
                            paddingHorizontal: 10,
                            color: '#111',
                            fontSize: 16,
                        },
                        inputAndroid: {
                            backgroundColor: '#f2f2f2',
                            borderRadius: 8,
                            height: 44,
                            paddingHorizontal: 10,
                            color: '#111',
                            fontSize: 16,
                        },
                        iconContainer: {
                            top: 12,
                            right: 12,
                        },
                    }}
                    Icon={() => <Ionicons name="chevron-down" size={20} color="#888" />}
                    useNativeAndroidPickerStyle={false}
                />
            </View>

            {/* Primeiro DatePicker */}
            <View style={styles.FirstContainerDataInput}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.SecondTextContainer}>Data de Levantamento</Text>
                    <TouchableOpacity onPress={() => setPickerType('inicio')}>
                        <View pointerEvents="none">
                            <TextInput
                                value={dataInicio ?? ''}
                                editable={false}
                                placeholder="Seleciona a data"
                                style={styles.FirstDateTimePicker}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Primeiro TimePicker */}
                <View style={{ flex: 1 }}>
                    <Text style={styles.ThridTextContainer}>Hora de Levantamento</Text>
                    <TouchableOpacity onPress={() => setPickerType('horaInicio')}>
                        <View pointerEvents="none">
                            <TextInput
                                value={horaInicio ?? ''}
                                editable={false}
                                placeholder="hh:mm"
                                style={styles.SecondDateTimePicker}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Segundo DatePicker */}
            <View style={styles.SecondContainerDataInput}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.FourthTextContainer}>Data de Entrega</Text>
                    <TouchableOpacity onPress={() => setPickerType('fim')}>
                        <View pointerEvents="none">
                            <TextInput
                                value={dataFim ?? ''}
                                editable={false}
                                placeholder="Seleciona a data"
                                style={styles.ThirdDateTimePicker}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Segundo TimePicker */}
                <View style={{ flex: 1 }}>
                    <Text style={styles.FifhtTextContainer}>Hora de Entrega</Text>
                    <TouchableOpacity onPress={() => setPickerType('horaFim')}>
                        <View pointerEvents="none">
                            <TextInput
                                value={horaFim ?? ''}
                                editable={false}
                                placeholder="hh:mm"
                                style={styles.FourthDateTimePicker}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Botões */}
            <View style={styles.FirstContainerButton}>
                <TouchableOpacity
                    style={styles.FirstButtonStyles}
                    onPress={() => {
                        setLocalizacao('');
                        setDataInicio(null);
                        setDataFim(null);
                        setHoraInicio(null);
                        setHoraFim(null);
                        setSelectedStand(''); // <-- limpa o stand selecionado!
                    }}
                >
                    <Text style={styles.FirstButtonText}>Limpar campos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.SecondContainerButton}
                    onPress={() => {
                        router.push({
                            pathname: '/pesquisar_viaturas',
                            params: {
                                standId: selectedStand,
                                dataInicio,
                                horaInicio,
                                dataFim,
                                horaFim,
                            }
                        });
                    }}
                >
                    <Text style={styles.SecondButtonText}>Pesquisar</Text>
                </TouchableOpacity>
            </View>
            {/* Modal DateTimePicker */}
            <DateTimePickerModal isVisible={pickerType !== null} mode={pickerType?.includes('hora') ? 'time' : 'date'} date={new Date()}
                onConfirm={handleConfirm}
                onCancel={() => setPickerType(null)}
                is24Hour={true}
                locale="pt-PT"
            />
        </View>

    );
}
