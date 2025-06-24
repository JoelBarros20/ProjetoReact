import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Searchbar, Menu, Button, Provider } from 'react-native-paper';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from '@/app/styles/Customer/ReservasCliente';

import { API_ROUTES } from '@/env';

export default function ClienteReservasPage() {

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [dataPesquisa, setDataPesquisa] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [reservas, setReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const onChangeSearch = (query: string) => setSearchQuery(query);
  const { width, height } = Dimensions.get('window');

  const handleConfirm = (selectedDate: Date) => {
    setDataPesquisa(formatDate(selectedDate));
    setDatePickerVisible(false);
  };

  const statusLabels: Record<number, string> = {
    1: 'Confirmada',
    2: 'Pendente',
    4: 'Concluída',
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Buscar reservas na API
  useEffect(() => {
    fetch(API_ROUTES.RESERVATIONS)
      .then(res => res.json())
      .then(data => {
        setReservas(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  // Vai buscar o id do utilizador guardado no AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem('userId').then(id => setUserId(id));
  }, []);

  if (userId === null) {
    // Ainda a carregar o userId
    return (
      <Provider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </Provider>
    );
  }

  // Filtro das reservas
  const reservasFiltradas = reservas.filter((reserva) => {
    // Só reservas do utilizador logado e que não estejam concluídas
    const isMyReservation = reserva.customer?.id?.toString() === userId;
    const isConcluida = reserva.status === 4;

    // Filtro por data de levantamento
    const dataOk = !dataPesquisa || reserva.pick_up_date?.startsWith(dataPesquisa);

    // Filtro por estado (status)
    // selectedStatus é string ("Confirmada", "Pendente", "Concluída"), reserva.status é número
    const statusOk =
      !selectedStatus ||
      statusLabels[reserva.status]?.toLowerCase() === selectedStatus.toLowerCase();

    // Filtro por pesquisa (pode pesquisar por código, nome do cliente, marca ou modelo do veículo)
    const pesquisaOk =
      !searchQuery ||
      reserva.reservation_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reserva.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reserva.vehicle?.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reserva.vehicle?.model?.toLowerCase().includes(searchQuery.toLowerCase());

    return isMyReservation && isConcluida && dataOk && statusOk && pesquisaOk;
  });

  return (
    <Provider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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

          {/* Filtros */}
          <View style={[styles.containerFilters]}>
            <View style={{ flexDirection: 'row', gap: 10, flex: 1 }}>
              {/* DateTime Picker */}
              <View style={{ flex: 1 }}>
                <View style={[styles.FirstDateTimePicker, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }]}>
                  <FontAwesome name="calendar" size={20} color="#000" />

                  <TouchableOpacity
                    style={{ flex: 1, marginLeft: 8 }}
                    activeOpacity={0.8}
                    onPress={() => setDatePickerVisible(true)}
                  >
                    <Text style={{ color: dataPesquisa ? '#000' : '#999' }}>
                      {dataPesquisa || 'Selecione uma data'}
                    </Text>
                  </TouchableOpacity>

                  {dataPesquisa && (
                    <TouchableOpacity onPress={() => setDataPesquisa(null)}>
                      <FontAwesome name="close" size={18} color="#999" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>


            </View>
          </View>
          {/* Barra de pesquisa */}
          <View style={styles.ContainerAllContent}>
            <View style={{ paddingRight: height * 0.016 }}>
              <Searchbar
                placeholder="Pesquisar reservas"
                value={searchQuery}
                inputStyle={{ fontSize: 14, paddingBottom: height * 0.021, textAlignVertical: 'center', color: '#000' }}
                placeholderTextColor="#666"
                iconColor="#666"
                onChangeText={onChangeSearch}
                style={styles.searchBar}
              />
            </View>
          </View>




          {/* Modal do DateTime Picker */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisible(false)}
            is24Hour={true}
            locale="pt-PT"
          />

          {/* Lista de Reservas */}
          <View>
            <Text style={styles.ListTitle}> Lista de reservas </Text>
          </View>

          <View style={{ flex: 1, width: '100%' }}>
            {loading ? (
              <ActivityIndicator size="large" color="#000" style={{ marginTop: 30 }} />
            ) : reservasFiltradas.length === 0 ? (
              <Text style={{ textAlign: 'center', marginTop: 30, color: '#666' }}>
                Nenhuma reserva encontrada.
              </Text>
            ) : (
              <FlatList
                data={reservasFiltradas}
                keyExtractor={(item) => item.id?.toString() ?? Math.random().toString()}
                renderItem={({ item }) => (
                  <View style={{
                    backgroundColor: '#fff',
                    marginHorizontal: 16,
                    marginVertical: 8,
                    borderRadius: 8,
                    padding: 16,
                    elevation: 2
                  }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Reserva #{item.id}</Text>
                    <Text>Código: {item.reservation_code ?? '-'}</Text>
                    <Text>Cliente: {item.customer?.name}</Text>
                    <Text>Veículo: {item.vehicle?.brand} {item.vehicle?.model}</Text>
                    <Text>Data de Levantamento: {item.pick_up_date}</Text>
                    <Text>Hora de Levantamento: {item.pick_up_hour}</Text>
                    <Text>Data de Devolução: {item.drop_off_date}</Text>
                    <Text>Hora de Devolução: {item.drop_off_hour}</Text>
                    <Text>Status: {statusLabels[item.status] ?? item.status}</Text>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Provider>
  );
}

{/* Dropdown
              <View style={{ flex: 1 }}>
                <Menu
                  visible={visible}
                  onDismiss={() => setVisible(false)}
                  anchor={
                    <Button onPress={() => setVisible(true)} mode="outlined" textColor='#000' labelStyle={{ fontWeight: 'normal' }}
                      style={styles.dropdownButton}>
                      {selectedStatus || 'Selecionar estado'}
                    </Button>
                  }
                >
                  <Menu.Item onPress={() => { setSelectedStatus(''); setVisible(false); }} title="Limpar filtro" />
                  <Menu.Item onPress={() => { setSelectedStatus('Confirmada'); setVisible(false); }} title="Confirmada" />
                  <Menu.Item onPress={() => { setSelectedStatus('Concluída'); setVisible(false); }} title="Concluída" />
                  <Menu.Item onPress={() => { setSelectedStatus('Pendente'); setVisible(false); }} title="Pendente" />
                </Menu>
              </View> */}