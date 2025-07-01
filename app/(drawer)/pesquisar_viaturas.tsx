import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Searchbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import styles from '@/app/styles/SearchVehicles'
import SideMenu from '@/components/generalComponents/Menu/SideMenu';
import FilterModal from '@/components/generalComponents/Categories/filtroModal';
import FiltrosSuperiores from '@/components/generalComponents/Categories/filtrosSuperiores';
import ListagemFotos from '@/components/generalComponents/Categories/listagemFotosPesquisados';

import { API_ROUTES, BASE_URL } from '@/env';

export default function PesquisarViaturas() {
    // HOOKS NO TOPO!
    const router = useRouter();
    const { standId, dataInicio, horaInicio, dataFim, horaFim } = useLocalSearchParams();

    function getParam(param: string | string[] | undefined): string | undefined {
        if (Array.isArray(param)) return param[0];
        return param;
    }

    const [veiculos, setVeiculos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [stands, setStands] = useState<{ id: number, name: string }[]>([]);
    const [reservas, setReservas] = useState<any[]>([]);

    const standIdStr = getParam(standId);
    const dataInicioStr = getParam(dataInicio);
    const horaInicioStr = getParam(horaInicio);
    const dataFimStr = getParam(dataFim);
    const horaFimStr = getParam(horaFim);

    // Filtros
    const [isModalVisible, setModalVisible] = useState(false);
    const [featuresOption, setfeaturesOptions] = useState('');
    const [numberOfSeat, setNumberOfSeats] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [featuresOptions, setFeaturesOptions] = useState<{ key: string, label: string }[]>([]);
    const [pendingFeaturesOption, setPendingFeaturesOption] = useState('');
    const [pendingNumberOfSeat, setPendingNumberOfSeat] = useState('');
    const [fuelOption, setFuelOption] = useState('');
    const [pendingFuelOption, setPendingFuelOption] = useState('');
    const [doorOption, setDoorOption] = useState('');
    const [pendingDoorOption, setPendingDoorOption] = useState('');
    const [selectedTransmission, setSelectedTransmission] = useState<'manual' | 'automatica' | ''>('');
    const [novoStand, setNovoStand] = useState(standIdStr);
    const [novaDataInicio, setNovaDataInicio] = useState(dataInicioStr);
    const [novaHoraInicio, setNovaHoraInicio] = useState(horaInicioStr);
    const [novaDataFim, setNovaDataFim] = useState(dataFimStr);
    const [novaHoraFim, setNovaHoraFim] = useState(horaFimStr);
    const [pickerType, setPickerType] = useState<'inicio' | 'fim' | 'horaInicio' | 'horaFim' | null>(null);
    const [standSelecionado, setStandSelecionado] = useState(standIdStr);
    const [dataInicioSelecionada, setDataInicioSelecionada] = useState(dataInicioStr);
    const [horaInicioSelecionada, setHoraInicioSelecionada] = useState(horaInicioStr);
    const [dataFimSelecionada, setDataFimSelecionada] = useState(dataFimStr);
    const [horaFimSelecionada, setHoraFimSelecionada] = useState(horaFimStr);

    type TransmissionOption = {
        key: string;
        label: string;
        icon: keyof typeof MaterialIcons.glyphMap;
    };

    const transmissionKeyToId = {
        manual: 1,
        automatica: 2,
    };


    // Opções para filtros
    const numberOfSeats = [
        { key: '2', label: '2' },
        { key: '3', label: '3' },
        { key: '5', label: '5' },
        { key: '7', label: '7' },
        { key: '8', label: '8' },
    ];

    const transmissionOptions: TransmissionOption[] = [
        { key: 'automatica', label: 'Transmissão Automática', icon: 'drive-eta' },
        { key: 'manual', label: 'Transmissão Manual', icon: 'build' },
    ];

    const fuelOptions = [
        { key: '1', label: 'Diesel' },
        { key: '2', label: 'Gasolina' },
        { key: '3', label: 'Etanol' },
        { key: '4', label: 'Biodiesel' },
        { key: '5', label: 'GNV' },
        { key: '6', label: 'Eletricidade' },

    ];

    const doorOptions = [
        { key: '2', label: '2' },
        { key: '3', label: '3' },
        { key: '5', label: '5' },
    ];

    // Fetch dos veículos do stand selecionado
    useEffect(() => {
        setLoading(true);
        fetch(API_ROUTES.VEHICLES)
            .then(res => res.json())
            .then(data => {
                const filtrados = data.filter((v: any) => v.stand_name === standSelecionado);
                setVeiculos(filtrados);
            })
            .finally(() => setLoading(false));
    }, [standSelecionado]);

    // Buscar stands da API (igual ao DatePicker)
    useEffect(() => {
        fetch(API_ROUTES.STANDS)
            .then(res => res.json())
            .then(data => setStands(data))
            .catch(() => setStands([]));
    }, []);

    useEffect(() => {
        fetch(API_ROUTES.FEATURES)
            .then(res => res.json())
            .then(data => {
                const options = data.map((f: any) => ({
                    key: f.name,   // <-- usar o nome como key
                    label: f.name,
                }));
                setFeaturesOptions(options);
            });
    }, []);

    useEffect(() => {
        setStandSelecionado(standIdStr);
        setDataInicioSelecionada(dataInicioStr);
        setHoraInicioSelecionada(horaInicioStr);
        setDataFimSelecionada(dataFimStr);
        setHoraFimSelecionada(horaFimStr);
    }, [standIdStr, dataInicioStr, horaInicioStr, dataFimStr, horaFimStr]);

    useEffect(() => {
        fetch(API_ROUTES.RESERVATIONS)
            .then(res => res.json())
            .then(data => setReservas(data))
            .catch(() => setReservas([]));
    }, []);

    function datasSobrepoem(inicio1: string, fim1: string, inicio2: string, fim2: string) {
        // Retorna true se os períodos [inicio1, fim1] e [inicio2, fim2] se sobrepõem
        return !(new Date(fim1) < new Date(inicio2) || new Date(fim2) < new Date(inicio1));
    }


    // Filtros aplicados sobre os veículos do stand
    const filteredVeiculos = veiculos.filter((img) => {
        // Transmissão
        const transmissionOk =
            !selectedTransmission ||
            String(img.transmission) === String(transmissionKeyToId[selectedTransmission]);

        // Pesquisa (marca ou modelo)
        const searchOk =
            !searchQuery ||
            img.brand_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            img.model_name?.toLowerCase().includes(searchQuery.toLowerCase());

        // Features
        const featureOk =
            !featuresOption ||
            (Array.isArray(img.features)
                ? img.features.includes(featuresOption)
                : img.features === featuresOption);
        // Número de lugares
        const seatsOk =
            !numberOfSeat ||
            img.capacity?.toString() === numberOfSeat;

        // Combustível
        const fuelOk =
            !fuelOption ||
            img.fuel?.toString() === fuelOption;

        // Número de portas
        const doorsOk =
            !doorOption ||
            img.door?.toString() === doorOption;

        if (dataInicioSelecionada && dataFimSelecionada) {
            const reservasDoVeiculo = reservas.filter(r =>
                r.vehicle?.id === img.id &&
                [1, 2].includes(r.status) // 1: pendente, 2: confirmada
            );
            const existeConflito = reservasDoVeiculo.some(r =>
                datasSobrepoem(
                    dataInicioSelecionada,
                    dataFimSelecionada,
                    r.pick_up_date,
                    r.drop_off_date
                )
            );
            if (existeConflito) return false;
        }

        return (
            transmissionOk &&
            searchOk &&
            featureOk &&
            fuelOk &&
            seatsOk &&
            doorsOk
        );
    });

    const toggleModal = () => setModalVisible(!isModalVisible);

    const clearFilters = () => {
        setPendingFeaturesOption('');
        setPendingNumberOfSeat('');
        setPendingFuelOption('');
        setPendingDoorOption('');
    };

    const openModal = () => {
        setPendingFeaturesOption(featuresOption);
        setPendingNumberOfSeat(numberOfSeat);
        setPendingFuelOption(fuelOption);
        setPendingDoorOption(doorOption);
        setModalVisible(true);
    };

    const applyFilters = () => {
        setfeaturesOptions(pendingFeaturesOption);
        setNumberOfSeats(pendingNumberOfSeat);
        setFuelOption(pendingFuelOption);
        setDoorOption(pendingDoorOption);
        setModalVisible(false);
    };

    // Só depois fazes o return condicional:
    if (loading) return <Text style={{ margin: 20 }}>A carregar...</Text>;

    // Função para formatar a data
    function formatDate(dateStr?: string) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return `${d.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' })}`;
    }

    function calcularMesesEDias(dataInicio?: string, dataFim?: string) {
        if (!dataInicio || !dataFim) return { meses: 0, dias: 0, totalDias: 0 };
        const d1 = new Date(dataInicio);
        const d2 = new Date(dataFim);
        const diffTime = Math.abs(d2.getTime() - d1.getTime());
        const totalDias = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        const meses = Math.floor(totalDias / 30);
        const dias = totalDias % 30;
        return { meses, dias, totalDias };
    }

    function calcularPreco(dataInicio?: string, dataFim?: string, precoDia = 30, precoMes = 700) {
        const { meses, dias, totalDias } = calcularMesesEDias(dataInicio, dataFim);
        if (totalDias < 30) {
            return totalDias * precoDia;
        } else {
            return (meses * precoMes) + (dias * precoDia);
        }
    }

    const handleOpenEditModal = () => {
        setNovoStand(standSelecionado);
        setNovaDataInicio(dataInicioSelecionada);
        setNovaHoraInicio(horaInicioSelecionada);
        setNovaDataFim(dataFimSelecionada);
        setNovaHoraFim(horaFimSelecionada);
        setEditModalVisible(true);
    };

    function validarDatasModal(dataInicio?: string, dataFim?: string) {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        if (!dataInicio || !dataFim) {
            return { valido: false, mensagem: 'Selecione ambas as datas.' };
        }
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);
        if (inicio < hoje) {
            return { valido: false, mensagem: 'A data de levantamento não pode ser inferior à data de hoje.' };
        }
        if (fim < inicio) {
            return { valido: false, mensagem: 'A data de devolução não pode ser inferior à data de levantamento.' };
        }
        return { valido: true, mensagem: '' };
    }

    return (
        <View style={styles.ContainerMainPage}>
            <View style={styles.HeaderPage}>
                <SideMenu />
                <Text style={styles.MainTitle}> Resultado da Pesquisa </Text>
                <View style={styles.spacer} />
            </View>

            {/* Bloco com stand e datas selecionadas */}
            <View style={{
                backgroundColor: '#f4f4f8',
                borderRadius: 12,
                marginHorizontal: 16,
                marginTop: 16,
                marginBottom: 10,
                padding: 14,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#222' }}>
                        {standSelecionado || 'Localização'}
                    </Text>
                    <Text style={{ color: '#555', fontSize: 14, marginTop: 2 }}>
                        {(dataInicioSelecionada && dataFimSelecionada)
                            ? `${formatDate(dataInicioSelecionada)} | ${horaInicioSelecionada} - ${formatDate(dataFimSelecionada)} | ${horaFimSelecionada}`
                            : 'Selecione datas'}
                    </Text>
                </View>
                <TouchableOpacity onPress={handleOpenEditModal}>
                    <MaterialIcons name="edit" size={22} color="#222" />
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.SubTitle}> Lista de Viaturas </Text>
            </View>

            {/* Botão para abrir o modal com os filtros */}
            <View style={styles.ContainerFilters}>
                <TouchableOpacity style={styles.ContainerButtonFilters} onPress={openModal}>
                    <Text style={styles.TextButtonFilters}>Filtros</Text>
                </TouchableOpacity>

                {/* Filtros superiores */}
                <FiltrosSuperiores
                    options={transmissionOptions}
                    onSelect={(key) => {
                        setSelectedTransmission(prev =>
                            prev === key ? '' : (key as 'manual' | 'automatica')
                        );
                    }}
                    selectedKey={selectedTransmission}
                />
            </View>

            {/* Componente Filtro Modal */}
            <FilterModal
                visible={isModalVisible}
                toggleModal={toggleModal}
                clearFilters={clearFilters}
                featuresOptionsArray={featuresOptions}
                featuresOptionAtual={pendingFeaturesOption}
                setfeaturesOptionsFunction={setPendingFeaturesOption}
                numberOfSeatsArray={numberOfSeats}
                numberOfSeatAtual={pendingNumberOfSeat}
                fuelOptionsArray={fuelOptions}
                fuelOptionAtual={pendingFuelOption}
                setFuelOptionsFunction={setPendingFuelOption}
                setNumberOfSeatsFunction={setPendingNumberOfSeat}
                doorsOptionsArray={doorOptions}
                doorOptionAtual={pendingDoorOption}
                setDoorOptionsFunction={setPendingDoorOption}
                onApplyFilters={applyFilters}
            />

            {/* Barra de pesquisa */}
            <View style={styles.ContainerSearchBar}>
                <View style={{ paddingRight: 16 }}>
                    <Searchbar
                        placeholder="Pesquisar viaturas"
                        value={searchQuery}
                        inputStyle={{ fontSize: 15, paddingBottom: 15 }}
                        onChangeText={setSearchQuery}
                        style={styles.searchBar}
                    />
                </View>
            </View>

            {filteredVeiculos.length === 0 ? (
                <Text style={{ textAlign: 'center', marginTop: 20 }}>
                    Nenhum veículo encontrado para o filtro selecionado.
                </Text>
            ) : (
                <ListagemFotos
                    photo_url={filteredVeiculos}
                    BASE_URL={BASE_URL}
                    from="pesquisar_viaturas"
                    fromSearch={true}
                    dataInicio={dataInicioSelecionada}
                    horaInicio={horaInicioSelecionada}
                    dataFim={dataFimSelecionada}
                    horaFim={horaFimSelecionada}
                    selectedStand={standSelecionado}
                />
            )}

            {/* Modal para edição de pesquisa */}
            <Modal
                visible={editModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setEditModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '90%' }}>
                        {/* Picker para Stand */}
                        <View style={{ marginBottom: 16 }}>
                            <Text style={{ marginBottom: 8 }}>Stand</Text>
                            <RNPickerSelect
                                onValueChange={setNovoStand}
                                value={novoStand}
                                placeholder={{ label: 'Escolha um stand', value: '' }}
                                items={stands.map(stand => ({
                                    label: stand.name,
                                    value: stand.name,
                                }))}
                                style={{
                                    inputIOS: {
                                        color: '#222',
                                        fontSize: 16,
                                        backgroundColor: '#eee',
                                        borderRadius: 6,
                                        paddingVertical: 20,
                                        paddingHorizontal: 12,
                                        paddingRight: 36, // espaço para a seta
                                    },
                                    inputAndroid: {
                                        color: '#222',
                                        fontSize: 16,
                                        backgroundColor: '#eee',
                                        borderRadius: 6,
                                        paddingVertical: 14,
                                        paddingHorizontal: 12,
                                        paddingRight: 36, // espaço para a seta
                                    },
                                    iconContainer: {
                                        top: 18,
                                        right: 16,
                                    },
                                }}
                                useNativeAndroidPickerStyle={false}
                                Icon={() => (
                                    <MaterialIcons name="arrow-drop-down" size={24} color="#888" />
                                )}
                            />
                        </View>

                        {/* Data e hora de levantamento */}
                        <Text style={{ marginTop: 16 }}>Data de Levantamento</Text>
                        <TouchableOpacity onPress={() => setPickerType('inicio')}>
                            <Text style={{ padding: 10, backgroundColor: '#eee', borderRadius: 6 }}>
                                {novaDataInicio || 'Selecionar data'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setPickerType('horaInicio')}>
                            <Text style={{ padding: 10, backgroundColor: '#eee', borderRadius: 6, marginTop: 6 }}>
                                {novaHoraInicio || 'Selecionar hora'}
                            </Text>
                        </TouchableOpacity>

                        {/* Data e hora de devolução */}
                        <Text style={{ marginTop: 16 }}>Data de Devolução</Text>
                        <TouchableOpacity onPress={() => setPickerType('fim')}>
                            <Text style={{ padding: 10, backgroundColor: '#eee', borderRadius: 6 }}>
                                {novaDataFim || 'Selecionar data'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setPickerType('horaFim')}>
                            <Text style={{ padding: 10, backgroundColor: '#eee', borderRadius: 6, marginTop: 6 }}>
                                {novaHoraFim || 'Selecionar hora'}
                            </Text>
                        </TouchableOpacity>

                        {/* DateTimePickerModal */}
                        <DateTimePickerModal
                            isVisible={pickerType !== null}
                            mode={pickerType?.includes('hora') ? 'time' : 'date'}
                            onConfirm={(date) => {
                                const formatDate = (d: Date) => d.toISOString().split('T')[0];
                                const formatTime = (d: Date) => d.toTimeString().slice(0, 5);

                                // Copia os valores atuais para validação
                                let novaDataInicioTemp = novaDataInicio;
                                let novaDataFimTemp = novaDataFim;

                                if (pickerType === 'inicio') novaDataInicioTemp = formatDate(date);
                                if (pickerType === 'fim') novaDataFimTemp = formatDate(date);

                                // Só valida datas (não horas)
                                if (pickerType === 'inicio' || pickerType === 'fim') {
                                    const { valido, mensagem } = validarDatasModal(novaDataInicioTemp, novaDataFimTemp);
                                    if (!valido) {
                                        alert(mensagem);
                                        setPickerType(null);
                                        return;
                                    }
                                }

                                if (pickerType === 'inicio') setNovaDataInicio(formatDate(date));
                                if (pickerType === 'fim') setNovaDataFim(formatDate(date));
                                if (pickerType === 'horaInicio') setNovaHoraInicio(formatTime(date));
                                if (pickerType === 'horaFim') setNovaHoraFim(formatTime(date));
                                setPickerType(null);
                            }}
                            onCancel={() => setPickerType(null)}
                            is24Hour={true}
                            locale="pt-PT"
                        />

                        {/* Botões */}
                        <TouchableOpacity
                            style={{ marginTop: 20, backgroundColor: '#b30000', borderRadius: 8, padding: 12 }}
                            onPress={() => {
                                const { valido, mensagem } = validarDatasModal(novaDataInicio, novaDataFim);
                                if (!valido) {
                                    alert(mensagem);
                                    return;
                                }
                                setEditModalVisible(false);
                                setStandSelecionado(novoStand);
                                setDataInicioSelecionada(novaDataInicio);
                                setHoraInicioSelecionada(novaHoraInicio);
                                setDataFimSelecionada(novaDataFim);
                                setHoraFimSelecionada(novaHoraFim);
                            }}
                        >
                            <Text style={{ color: '#fff', textAlign: 'center' }}>Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginTop: 10 }}
                            onPress={() => setEditModalVisible(false)}
                        >
                            <Text style={{ color: '#b30000', textAlign: 'center' }}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {loading && (
                <View style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 999,
                }}>
                    <ActivityIndicator size="large" color="#b30000" />
                    <Text style={{ marginTop: 10 }}>A carregar...</Text>
                </View>
            )}
        </View>
    );
}