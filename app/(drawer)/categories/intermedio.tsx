import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Categories/Intermedio';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { API_ROUTES, BASE_URL } from '@/env';
import { Searchbar } from 'react-native-paper';
import FilterModal from '@/components/generalComponents/Categories/filtroModal';
import ListagemFotos from '@/components/generalComponents/Categories/listagemFotos'

type VehicleImage = {
  id: number;
  image_url: string;
};

export default function IntermedioPage() {

  // Variável com valor fixo
  const [isModalVisible, setModalVisible] = useState(false); // mostrar ou esconder o modal dos filtros
  const [sortOption, setSortOption] = useState("sort"); // controlar as opções dos filtros do modal
  const [featuresOption, setfeaturesOptions] = useState("featured"); // controlar as opções dos filtros do modal
  const [numberOfSeat, setNumberOfSeats] = useState("numberSeats"); // controlar as opções dos filtros do modal
  const [isScrolling, setIsScrolling] = useState(false); // detetar quando o scroll do Flatlist está a funcionar
  const [searchQuery, setSearchQuery] = useState(''); // valor atual do searchinput
  const [images, setImages] = useState<VehicleImage[]>([]); // armazenar as imagens vindas da API

  const navigation = useNavigation();
  const toggleModal = () => { setModalVisible(!isModalVisible) };
  const onChangeSearch = (query: string) => setSearchQuery(query);

  // Função para limpar os filtros do modal
  const clearFilters = () => { setSortOption("sort"), setfeaturesOptions("featured"), setNumberOfSeats("numberSeats") };

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
  const transmissionOptions = [
    { key: 'automatica', label: 'Automática', icon: 'drive-eta' },
    { key: 'manual', label: 'Manual', icon: 'build' },
  ] as const;

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
    fetch(API_ROUTES.IMAGES)
      .then(res => res.json())
      .then((data) => {
        setImages(data);
      })
      .catch(() => { });
  }, []);

  return (
    <View style={styles.Container}>
      <View style={styles.backgroundImage}>
        <View style={styles.Menu}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <MaterialIcons name="menu" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.Title}> Viaturas Intermédias </Text>
        <View style={styles.spacer} />
      </View>

      <View>
        <Text style={styles.SubTitle}> Lista de Viaturas </Text>
      </View>

      {/* Botão para abrir o modal com os filtros */}
      <View style={styles.ContainerFilters}>
        <TouchableOpacity style={styles.ButtonFilters} onPress={toggleModal}>
          <Text style={styles.ButtonFiltros}>Filtros</Text>
        </TouchableOpacity>

        {/* Filtros superiores */}
        <View style={{ width: 250, paddingHorizontal: 4 }}>
          <FlatList style={{}}
            data={transmissionOptions}
            keyExtractor={(item) => item.key}
            horizontal
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
                <TouchableOpacity style={styles.ButtonFilters} disabled={isScrolling} >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <MaterialIcons name={item.icon} size={16} color={'#FFF'} />
                    <Text style={styles.ButtonFiltros}>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              </View>

            )}
          />
        </View>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.ContainerAllContent}>
        <View style={{ paddingRight: 16 }}>
          <Searchbar
            placeholder="Pesquisar viaturas"
            value={searchQuery}
            inputStyle={{ fontSize: 15, paddingBottom: 15 }}
            onChangeText={(query) => {
              setSearchQuery(query);
            }}
            style={styles.searchBar}
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
      </View >

      <ListagemFotos
        images={images}
        BASE_URL={BASE_URL}
      />
    </View >
  );
}
