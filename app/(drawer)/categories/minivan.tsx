import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Categories/Minivan';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { API_ROUTES, BASE_URL } from '@/env';
import Modal from "react-native-modal";
import { Searchbar } from 'react-native-paper';

type VehicleImage = {
  id: number;
  image_url: string;
};

// Variável global para obter os tamanhos dos ecrâs
const { width, height } = Dimensions.get('window');

export default function MinivanPage() {

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
        <Text style={styles.Title}> Viaturas Minivan </Text>
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

        <Modal isVisible={isModalVisible} style={styles.modal} backdropTransitionInTiming={200} backdropTransitionOutTiming={200}
          onBackdropPress={() => { }}>
          <View style={styles.modalContent}>

            {/* Header do modal */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={toggleModal}>
                <MaterialIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>

              <Text style={styles.modalHeaderTitle}>Filtros</Text>

              <TouchableOpacity onPress={clearFilters}>
                <Text style={styles.modalHeaderClear}>Limpar</Text>
              </TouchableOpacity>
            </View>

            {/* Conteúdo do modal - Sort */}
            <View style={{ marginTop: height * 0.02 }}>
              <Text style={[styles.optionText, { fontWeight: 'bold', marginBottom: height * 0.01 }]}>
                Visualizar por
              </Text>
              <FlatList horizontal data={sortOptions} keyExtractor={(item) => item.key} showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.sortButtonsContainer}
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
                contentContainerStyle={styles.sortButtonsContainer}
                renderItem={({ item }) => {
                  const isActive = featuresOption === item.key;

                  return (
                    <TouchableOpacity style={[styles.sortButton, isActive && styles.sortButtonActive]} onPress={() => setfeaturesOptions(item.key)}>
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

              {/* Conteúdo do modal - Número de Lugares */}
              <Text style={[styles.optionText, { fontWeight: 'bold', marginBottom: height * 0.01 }]}>
                Número de lugares
              </Text>
              <FlatList horizontal data={numberOfSeats} keyExtractor={(item) => item.key} showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.sortButtonsContainer}
                renderItem={({ item }) => {
                  const isActive = numberOfSeat === item.key;

                  return (
                    <TouchableOpacity style={[styles.sortButton, isActive && styles.sortButtonActive]} onPress={() => setNumberOfSeats(item.key)}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Text style={[styles.sortButtonText, isActive && styles.sortButtonTextActive]} numberOfLines={1}
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
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.ContainerButtonOffers}>
                <Text style={styles.ButtonOfertas}>Aplicar filtros</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View >

      {/* Lista das viaturas */}
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <ScrollView horizontal={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: height * 0.3, width: '100%' }}
          bounces={false}
          scrollEnabled={true}
          overScrollMode="never">
          {images.map((img, index) => {
            const imageUrl = `${BASE_URL}${img.image_url}`;
            return (
              <View key={index} style={styles.ContainerCards}>
                <Image source={{ uri: imageUrl }} style={styles.Image} resizeMode="cover" />
                <View style={{ paddingHorizontal: 10, paddingTop: 8 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>Peugeot 208</Text>
                  <Text style={{ fontSize: 13, color: '#999' }}>ou Similar | Económico</Text>
                </View>
                <View style={styles.ContainerInsideCard}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>€150.00</Text>
                  <TouchableOpacity style={styles.ContainerInsideButton}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ver</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View >
  );
}
