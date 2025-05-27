import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import styles from '@/app/styles/ComponentsStyles/Homepage/DatePicker'

export default function AnimatedPages() {
    
    const [localizacao, setLocalizacao] = useState('');
    const [dataInicio, setDataInicio] = useState<string | null>(null);
    const [horaInicio, setHoraInicio] = useState<string | null>(null);
    const [dataFim, setDataFim] = useState<string | null>(null);
    const [horaFim, setHoraFim] = useState<string | null>(null);
    const [pickerType, setPickerType] = useState<string | null>(null);

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


    return (
        <View>
            <Text style={styles.FirstTextContainer}>Localização do Stand</Text>
            <TextInput
                style={styles.TextInput}
                placeholder="Ex: Viseu"
                value={localizacao}
                onChangeText={setLocalizacao}
            />

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
                    }}
                >
                    <Text style={styles.FirstButtonText}>Limpar campos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.SecondContainerButton}>
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
