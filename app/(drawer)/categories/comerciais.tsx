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
  transmission: string;
  category_name: string;
};

type TransmissionOption = {
  key: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export default function ComerciaisPage() {

  // Variável com valor fixo
  const [isModalVisible, setModalVisible] = useState(false); // mostrar ou esconder o modal dos filtros
  const [sortOption, setSortOption] = useState("sort"); // controlar as opções dos filtros do modal
  const [featuresOption, setfeaturesOptions] = useState("featured"); // controlar as opções dos filtros do modal
  const [numberOfSeat, setNumberOfSeats] = useState("numberSeats"); // controlar as opções dos filtros do modal
  const [searchQuery, setSearchQuery] = useState(''); // valor atual do searchinput
  const [images, setImages] = useState<VehicleImage[]>([]); // armazenar as imagens vindas da API

  const toggleModal = () => { setModalVisible(!isModalVisible) };
  const onChangeSearch = (query: string) => setSearchQuery(query);

  // Função para limpar os filtros do modal
  const clearFilters = () => { setSortOption("sort"), setfeaturesOptions("featured"), setNumberOfSeats("numberSeats") };

  const transmissionKeyToId = {
    manual: 1,
    automatica: 2,
  };

  // Listas para popular os flatlists dos filtros com opções
  const sortOptions = [
    { key: 'featured', label: 'Featured' },
    { key: 'highest', label: 'Highest price' },
    { key: 'lowest', label: 'Lowest price' },
  ];

  // Listas para popular os flatlists dos filtros com opções
  const featuresOptions = [
    { key: 'AC', label: 'AC' },
    { key: 'Extra 1', label: 'Extra 1' },
    { key: 'Extra 2', label: 'Extra 2' },
  ];

  // Listas para popular os flatlists dos filtros com opções
  const numberOfSeats = [
    { key: '4', label: '4' },
    { key: '5', label: '5' },
    { key: '7', label: '7' },
    { key: '8', label: '8' },
  ];

  // Listas para popular os flatlists dos filtros com opções
  const transmissionOptions: TransmissionOption[] = [
    { key: 'automatica', label: 'Automática', icon: 'drive-eta' },
    { key: 'manual', label: 'Manual', icon: 'build' },
  ];

  const [selectedTransmission, setSelectedTransmission] = useState<'manual' | 'automatica' | ''>('');

  const filters = images.filter(
    (img) =>
      (!selectedTransmission || img.transmission === selectedTransmission) &&
      img.category_name?.toLowerCase() === 'comercial' &&
      img.photo_url && typeof img.photo_url === 'string' && img.photo_url.trim() !== '' &&
      (searchQuery === '' ||
        img.brand_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.model_name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  // Função para atribuir icons às opções dos filtros
  const getFilterIcon = (cat: string, isActive: boolean) => {
    const iconColor = isActive ? '#000' : '#fff';

    switch (cat) {
      case 'featured':
        return <MaterialIcons name="star" size={16} color={iconColor} />;
      case 'highest':
        return <MaterialIcons name="arrow-upward" size={16} color={iconColor} />;
      case 'lowest':
        return <MaterialIcons name="arrow-downward" size={16} color={iconColor} />;
      default:
        return null;
    }
  };

  // Código responsável por fazer a requisição à API (Imagens)
  useEffect(() => {
    fetch(API_ROUTES.VEHICLES)
      .then(res => res.json())
      .then((data) => {
        const filtered = data.filter(
          (v: any) =>
            v.category_name?.toLowerCase() === 'comercial' &&
            v.photo_url && typeof v.photo_url === 'string' && v.photo_url.trim() !== ''
        );
        setImages(filtered);
      })
      .catch(() => { });
  }, []);

  return (
    <View style={styles.ContainerMainPage}>
      <View style={styles.HeaderPage}>
        <SideMenu />
        <Text style={styles.MainTitle}> Viaturas Comerciais </Text>
        <View style={styles.spacer} />
      </View>

      <View>
        <Text style={styles.SubTitle}> Lista de Viaturas </Text>
      </View>

      {/* Botão para abrir o modal com os filtros */}
      <View style={styles.ContainerFilters}>
        <TouchableOpacity style={styles.ContainerButtonFilters} onPress={toggleModal}>
          <Text style={styles.TextButtonFilters}>Filtros</Text>
        </TouchableOpacity>

        {/* Filtros superiores */}
        <FiltrosSuperiores
          options={transmissionOptions}
          onSelect={(key) => setSelectedTransmission(key as 'manual' | 'automatica' | '')}
          selectedKey={selectedTransmission}
        />

      </View>

      {/* Componente Filtro Modal */}
      <FilterModal
        visible={isModalVisible}
        toggleModal={toggleModal}
        clearFilters={clearFilters}
        sortOptions={sortOptions}
        sortOption={sortOption}
        setSortOption={setSortOption}
        featuresOptions={featuresOptions}
        featuresOption={featuresOption}
        setfeaturesOptions={setfeaturesOptions}
        numberOfSeats={numberOfSeats}
        numberOfSeat={numberOfSeat}
        setNumberOfSeats={setNumberOfSeats}
        getFilterIcon={getFilterIcon}
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

      {/* Componente Lista dos Veiculos */}
      <ListagemFotos
        photo_url={filters}
        BASE_URL={BASE_URL}
        from="categories/comerciais"
      />
    </View >
  );
}
