import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Searchbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import styles from '@/app/styles/SearchVehicles'
import SideMenu from '@/components/generalComponents/Menu/SideMenu';
import FilterModal from '@/components/generalComponents/Categories/filtroModal';
import FiltrosSuperiores from '@/components/generalComponents/Categories/filtrosSuperiores';
import ListagemFotos from '@/components/generalComponents/Categories/listagemFotosPesquisados';

import { API_ROUTES, BASE_URL } from '@/env';

export default function PesquisarViaturas() {

    const router = useRouter();
    const { standId, dataInicio, horaInicio, dataFim, horaFim } = useLocalSearchParams();

    function getParam(param: string | string[] | undefined): string | undefined {
        if (Array.isArray(param)) return param[0];
        return param;
    }

    const [veiculos, setVeiculos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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
                const filtrados = data.filter((v: any) => v.stand_name === standId);
                setVeiculos(filtrados);
            })
            .finally(() => setLoading(false));
    }, [standId]);


  

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

    if (loading) return <Text style={{ margin: 20 }}>A carregar...</Text>;



    return (
        <View style={styles.ContainerMainPage}>
            <View style={styles.HeaderPage}>
                <SideMenu />
                <Text style={styles.MainTitle}> Resultado da Pesquisa </Text>
                <View style={styles.spacer} />
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
                    dataInicio={dataInicioStr}
                    horaInicio={horaInicioStr}
                    dataFim={dataFimStr}
                    horaFim={horaFimStr}
                    selectedStand={standIdStr}
                />
            )}
        </View>
    );
}