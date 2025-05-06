import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import styles from '../../styles/Customer/ReservasCliente';
import { Searchbar } from 'react-native-paper';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export default function ClienteReservasPage() {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const navigation = useNavigation();

  const [dataPesquisa, setDataPesquisa] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState('');

  const handleConfirm = (selectedDate: Date) => {
    setDataPesquisa(formatDate(selectedDate));
    setDatePickerVisible(false);
  };

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <View style={styles.Container}>
      <View style={styles.backgroundImage}>

        {/* Menu Lateral */}
        <View style={styles.Menu}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <MaterialIcons name="menu" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.Title}> Minhas Reservas </Text>
        <View style={styles.spacer} />
      </View>

      <View>
        <Text style={styles.SubTitle}> Filtros </Text>
      </View>

      {/* Botão para abrir o modal com os filtros */}
      <View style={styles.containerFilters}>

        {/* DataTime Picker */}
        <View style={styles.FirstContainerDataInput}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity activeOpacity={0.8} style={styles.FirstDateTimePicker}
              onPress={() => {
                setDatePickerVisible(true);
              }}
            >
              <FontAwesome name="calendar" size={24} color="#000" style={{ paddingHorizontal: 16 }} />
              <Text style={{ color: dataPesquisa ? '#000' : '#000', paddingHorizontal: 10 }}>
                {dataPesquisa || 'Selecione uma data'}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.ContainerAllContent}>
        <View style={{ paddingRight: 16 }}>
          <Searchbar placeholder="Pesquisar viaturas" value={searchQuery} inputStyle={{ fontSize: 15, paddingBottom: 15 }}
            onChangeText={(query) => {
              setSearchQuery(query);
            }}
            style={styles.searchBar}
          />
        </View>
      </View>

      {/* Modal do DateTime Picker */}
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="date"
        onConfirm={(date) => {
          setDataPesquisa(date.toISOString().split('T')[0]);
          setDatePickerVisible(false);
        }}
        onCancel={() => setDatePickerVisible(false)}
        is24Hour={true}
        locale="pt-PT"
      />
    </View >
  );
}