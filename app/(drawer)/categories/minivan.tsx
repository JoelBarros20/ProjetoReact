import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { API_ROUTES, BASE_URL } from '@/env';
import { Searchbar } from 'react-native-paper';

import FilterModal from '@/components/generalComponents/Categories/filtroModal';
import ListagemFotos from '@/components/generalComponents/Categories/listagemFotos';
import FiltrosSuperiores from '@/components/generalComponents/Categories/filtrosSuperiores';
import SideMenu from '@/components/generalComponents/Menu/SideMenu';

import styles from '@/app/styles/Categories/Comerciais';

type VehicleImage = {
  id: number;
  photo_url: string;
  base_price_day: number;
  brand_name: string;
  model_name: string;
  transmission: number;
  category_name: string;
  features?: string[] | number[];
  fuel?: string | number;
  doors?: number;
  capacity?: number;
};

type TransmissionOption = {
  key: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export default function ComerciaisPage() {

  // Variável com valor fixo
  const [isModalVisible, setModalVisible] = useState(false); // mostrar ou esconder o modal dos filtros
  const [featuresOption, setfeaturesOptions] = useState('');
  const [numberOfSeat, setNumberOfSeats] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // valor atual do searchinput
  const [images, setImages] = useState<VehicleImage[]>([]); // armazenar as imagens vindas da API
  const [featuresOptions, setFeaturesOptions] = useState<{ key: string, label: string }[]>([]);
  const [pendingFeaturesOption, setPendingFeaturesOption] = useState('');
  const [pendingNumberOfSeat, setPendingNumberOfSeat] = useState('');
  const [fuelOption, setFuelOption] = useState('');
  const [pendingFuelOption, setPendingFuelOption] = useState('');
  const [doorOption, setDoorOption] = useState('');
  const [pendingDoorOption, setPendingDoorOption] = useState('');

  const toggleModal = () => { setModalVisible(!isModalVisible) };

  // Função para limpar os filtros do modal
  const clearFilters = () => { setPendingFeaturesOption(''), setPendingNumberOfSeat(''), setPendingFuelOption(''), setPendingDoorOption('') };

  const transmissionKeyToId = {
    manual: 1,
    automatica: 2,
  };

  // Listas para popular os flatlists dos filtros com opções
  const numberOfSeats = [
    { key: '3', label: '3' },
    { key: '5', label: '5' },
    { key: '7', label: '7' },
    { key: '8', label: '8' },
  ];

  // Listas para popular os flatlists dos filtros com opções
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

  const [selectedTransmission, setSelectedTransmission] = useState<'manual' | 'automatica' | ''>('');

  const openModal = () => {
    setPendingFeaturesOption(featuresOption);
    setPendingNumberOfSeat(numberOfSeat);
    setModalVisible(true);
  };

  const applyFilters = () => {
    setfeaturesOptions(pendingFeaturesOption);
    setNumberOfSeats(pendingNumberOfSeat);
    setFuelOption(pendingFuelOption);
    setDoorOption(pendingDoorOption);
  };

  const filters = images.filter((img) => {
    // Filtro por transmissão
    const transmissionOk =
      !selectedTransmission ||
      img.transmission === transmissionKeyToId[selectedTransmission];

    // Filtro por categoria (comercial)
    const categoryOk = img.category_name?.toLowerCase() === 'minivan';

    // Filtro por foto válida
    const photoOk =
      img.photo_url && typeof img.photo_url === 'string' && img.photo_url.trim() !== '';

    // Filtro por pesquisa (marca ou modelo)
    const searchOk =
      !searchQuery ||
      img.brand_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.model_name?.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtro por extra/feature (supondo que img.features é um array de ids ou strings)
    const featureOk =
      !featuresOption ||
      (Array.isArray(img.features)
        ? img.features.map(String).includes(featuresOption)
        : String(img.features) === featuresOption);

    // Filtro por número de lugares (supondo que img.seats é um número ou string)
    const seatsOk =
      !numberOfSeat ||
      img.capacity?.toString() === numberOfSeat;

    const fuelOk =
      !fuelOption ||
      img.fuel?.toString() === fuelOption;

    const doorsOk =
      !doorOption ||
      img.doors?.toString() === doorOption;

    return (
      transmissionOk &&
      categoryOk &&
      photoOk &&
      searchOk &&
      featureOk &&
      fuelOk &&
      seatsOk &&
      doorsOk
    );
  });

  // Código responsável por fazer a requisição à API (Imagens)
  useEffect(() => {
    fetch(API_ROUTES.VEHICLES)
      .then(res => res.json())
      .then((data) => {
        const filtered = data.filter(
          (v: any) =>
            v.category_name?.toLowerCase() === 'minivan' &&
            v.photo_url && typeof v.photo_url === 'string' && v.photo_url.trim() !== ''
        ).map((v: any) => ({
          ...v,
          transmission: Number(v.transmission),
        }));
        setImages(filtered);
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    fetch(API_ROUTES.FEATURES)
      .then(res => res.json())
      .then(data => {
        // Supondo que cada feature tem id e name
        setFeaturesOptions(
          data.map((f: any) => ({
            key: f.name,   // <-- agora o key é o nome do extra!
            label: f.name
          }))
        );
      })
      .catch(() => { });
  }, []);

  return (
    <View style={styles.ContainerMainPage}>
      <View style={styles.HeaderPage}>
        <SideMenu />
        <Text style={styles.MainTitle}> Viaturas Minivan </Text>
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
          <Searchbar placeholder="Pesquisar viaturas" value={searchQuery} inputStyle={{ fontSize: 15, paddingBottom: 15 }}
            onChangeText={(query) => {
              setSearchQuery(query);
            }}
            style={styles.searchBar}
          />
        </View>
      </View >

      {filters.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Nenhum veículo encontrado para o filtro selecionado.
        </Text>
      ) : (
        <ListagemFotos
          photo_url={filters}
          BASE_URL={BASE_URL}
          from="categories/comerciais"
        />
      )}
    </View >
  );
}
