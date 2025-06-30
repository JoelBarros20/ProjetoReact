import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Text, Dimensions, FlatList, ActivityIndicator, Modal, TextInput, Alert } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Searchbar, Menu, Button, Provider } from 'react-native-paper';
import { DrawerActions, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from '@/app/styles/Customer/ReservasCliente';
import RNPickerSelect from 'react-native-picker-select';

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
  const [checkinModalVisible, setCheckinModalVisible] = useState(false);
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [anomalias, setAnomalias] = useState('');
  const [anomaliasCheckout, setAnomaliasCheckout] = useState('');
  const [reservaCheckin, setReservaCheckin] = useState<any>(null);
  const [reservaCheckout, setReservaCheckout] = useState<any>(null);
  const [anomaliaTipoSelecionada, setAnomaliaTipoSelecionada] = useState<string | undefined>(undefined);
  const [anomaliaTipoSelecionadaCheckout, setAnomaliaTipoSelecionadaCheckout] = useState<string | undefined>(undefined);
  const [anomaliasTipos, setAnomaliasTipos] = useState<any[]>([]);

  const onChangeSearch = (query: string) => setSearchQuery(query);
  const { width, height } = Dimensions.get('window');

  const handleConfirm = (selectedDate: Date) => {
    setDataPesquisa(formatDate(selectedDate));
    setDatePickerVisible(false);
  };

  const statusLabels: Record<number, string> = {
    1: 'Pendente',
    2: 'Confirmada',
    3: 'Cancelada',
    4: 'Concluída',
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const fetchReservas = () => {
    setLoading(true);
    fetch(API_ROUTES.RESERVATIONS)
      .then(res => res.json())
      .then(data => {
        setReservas(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // Obtem as reservas através da API
  useFocusEffect(
    useCallback(() => {
      fetchReservas();
    }, [])
  );

  // Vai buscar o id do utilizador guardado no AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem('userId').then(id => setUserId(id));
  }, []);

  // Obtem os tipos de anomalias através da API
  useEffect(() => {
    fetch(API_ROUTES.ANOMALIESTYPES)
      .then(res => res.json())
      .then(data => setAnomaliasTipos(data))
      .catch(() => setAnomaliasTipos([]));
  }, []);

  if (userId === null) {
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
    const notConcluida = reserva.status !== 4;

    // Filtro por data de levantamento
    const dataOk = !dataPesquisa || reserva.pick_up_date?.startsWith(dataPesquisa);

    // Filtro por estado (status)
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

    return isMyReservation && notConcluida && dataOk && statusOk && pesquisaOk;
  });

  // Função chamada ao confirmar o check-in
  const handleConfirmCheckin = async () => {
    // Se descrição está preenchida mas não escolheu tipo de anomalia
    if (anomalias.trim() !== '' && (!anomaliaTipoSelecionada || anomaliaTipoSelecionada === '')) {
      Alert.alert('Atenção', 'Por favor, selecione o tipo de anomalia.');
      return;
    }
    await atualizarReservaCheckin();
    setCheckinModalVisible(false);
    setAnomalias('');
    setReservaCheckin(null);
    setAnomaliaTipoSelecionada('');
    Alert.alert('Sucesso', 'Check-in realizado com sucesso!');
  };

  async function atualizarReservaCheckin() {
    if (!reservaCheckin) return;

    // Atualiza o estado da reserva
    const url = API_ROUTES.RESERVATIONSUPDATE.replace('{id}', reservaCheckin.id.toString());
    await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    //Se houver anomalia, regista na tabela de anomalias
    if (anomaliaTipoSelecionada && anomaliaTipoSelecionada !== '' && anomalias.trim() !== '') {
      // console.log('reservaCheckin:', reservaCheckin);
      const anomalyBody = {
        anomaly_type_id: String(anomaliaTipoSelecionada),
        vehicle_id: String(reservaCheckin.vehicle.id),
        description: anomalias,
      };
      // console.log('POST ANOMALIA', API_ROUTES.ANOMALIES, anomalyBody);

      try {
        const response = await fetch(API_ROUTES.ANOMALIES, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(anomalyBody),
        });
        const data = await response.json();
        // console.log('Resposta do POST anomalia:', data, response.status);
      } catch (error) {
        // console.log('Erro ao enviar anomalia:', error);
      }
    }

    // Atualiza o estado local
    setReservas(reservas =>
      reservas.map(r =>
        r.id === reservaCheckin.id
          ? { ...r, status: 2 }
          : r
      )
    );
  }

  // Função chamada ao confirmar o check-out
  const handleConfirmCheckout = async () => {
    if (anomaliasCheckout.trim() !== '' && (!anomaliaTipoSelecionadaCheckout || anomaliaTipoSelecionadaCheckout === '')) {
      Alert.alert('Atenção', 'Por favor, selecione o tipo de anomalia.');
      return;
    }
    await atualizarReservaCheckout();
    setCheckoutModalVisible(false);
    setAnomaliasCheckout('');
    setReservaCheckout(null);
    setAnomaliaTipoSelecionadaCheckout('');
    Alert.alert('Sucesso', 'Check-out realizado com sucesso!');
  };

  async function atualizarReservaCheckout() {
    if (!reservaCheckout) return;

    // Atualiza o estado da reserva para concluída
    const url = API_ROUTES.RESERVATIONSUPDATESTATUS.replace('{id}', reservaCheckout.id.toString());
    await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    // Se houver anomalia, regista na tabela de anomalias
    if (anomaliaTipoSelecionadaCheckout && anomaliaTipoSelecionadaCheckout !== '' && anomaliasCheckout.trim() !== '') {
      const anomalyBody = {
        anomaly_type_id: String(anomaliaTipoSelecionadaCheckout),
        vehicle_id: String(reservaCheckout.vehicle.id),
        description: anomaliasCheckout,
      };
      try {
        const response = await fetch(API_ROUTES.ANOMALIES, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(anomalyBody),
        });
        await response.json();
      } catch (error) {
        console.log('Erro ao enviar anomalia:', error);
      }
    }

    // Atualiza o estado local
    setReservas(reservas =>
      reservas.map(r =>
        r.id === reservaCheckout.id
          ? { ...r, status: 4 }
          : r
      )
    );
  }

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

          <Text style={styles.SubTitle}>Filtros</Text>
          <View style={styles.containerFilters}>
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

              {/* Dropdown */}
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

          <Text style={styles.ListTitle}>Lista de reservas</Text>

          {/* Lista das reservas do utilizador */}

          <View style={{ flex: 1 }}>
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

                    {/* Botão de check-in para reservas pendentes */}
                    {item.status === 1 && (
                      <TouchableOpacity
                        style={styles.ButtonCheckIn}
                        onPress={() => {
                          setReservaCheckin(item);
                          setCheckinModalVisible(true);
                        }}
                      >
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Realizar check-in</Text>
                      </TouchableOpacity>
                    )}

                    {/* Botão de check-out para reservas confirmadas */}
                    {item.status === 2 && (
                      <TouchableOpacity
                        style={styles.ButtonCheckOut}
                        onPress={() => {
                          setReservaCheckout(item);
                          setCheckoutModalVisible(true);
                        }}
                      >
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Realizar check-out</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                contentContainerStyle={{ paddingBottom: 32 }}
                keyboardShouldPersistTaps="handled"
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Modal do DateTime Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisible(false)}
        is24Hour={true}
        locale="pt-PT"
      />

      {/* Modal de Check-in */}
      <Modal
        visible={checkinModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCheckinModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, width: '90%' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>
                Check-in da Reserva {reservaCheckin?.id ? `#${reservaCheckin.id}` : ''}
              </Text>
              <View style={{ marginBottom: 16 }}>
                <Text style={{ marginBottom: 8 }}>Tipo de anomalia (opcional)</Text>
                <RNPickerSelect
                  onValueChange={value => setAnomaliaTipoSelecionada(value)}
                  value={anomaliaTipoSelecionada}
                  placeholder={{ label: 'Selecionar tipo', value: '' }}
                  items={[
                    { label: 'Nenhum', value: '' },
                    ...anomaliasTipos.map(tipo => ({
                      label: tipo.name,
                      value: String(tipo.id),
                    })),
                  ]}
                  style={{
                    inputIOS: {
                      color: '#222',
                      fontSize: 16,
                      backgroundColor: '#eee',
                      borderRadius: 6,
                      paddingVertical: 14,
                      paddingHorizontal: 12,
                      paddingRight: 36,
                      marginBottom: 4,
                    },
                    inputAndroid: {
                      color: '#222',
                      fontSize: 16,
                      backgroundColor: '#eee',
                      borderRadius: 6,
                      paddingVertical: 14,
                      paddingHorizontal: 12,
                      paddingRight: 36,
                      marginBottom: 4,
                    },
                    iconContainer: {
                      top: 12,
                      right: 16,
                    },
                  }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => (
                    <MaterialIcons name="arrow-drop-down" size={24} color="#888" />
                  )}
                />
              </View>

              <Text style={{ marginBottom: 8 }}>Descrição</Text>
              <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 16, padding: 8 }}>
                <TextInput
                  placeholder="Descreva as anomalias, se existirem..."
                  value={anomalias}
                  onChangeText={setAnomalias}
                  multiline
                  style={{ minHeight: 60, textAlignVertical: 'top' }}
                />
              </View>

              <TouchableOpacity
                style={{ backgroundColor: '#2ecc40', borderRadius: 6, paddingVertical: 12, alignItems: 'center', marginBottom: 10 }}
                onPress={handleConfirmCheckin}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Confirmar Check-in</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => {
                  setCheckinModalVisible(false);
                  setAnomalias('');
                  setAnomaliaTipoSelecionada('');
                  setReservaCheckin(null);
                }}
              >
                <Text style={{ color: '#b30000' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal de Check-out */}
      <Modal
        visible={checkoutModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCheckoutModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, width: '90%' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>
                Check-out da Reserva {reservaCheckout?.id ? `#${reservaCheckout.id}` : ''}
              </Text>
              <View style={{ marginBottom: 16 }}>
                <Text style={{ marginBottom: 8 }}>Tipo de anomalia (opcional)</Text>
                <RNPickerSelect
                  onValueChange={value => setAnomaliaTipoSelecionadaCheckout(value)}
                  value={anomaliaTipoSelecionadaCheckout}
                  placeholder={{ label: 'Selecionar tipo', value: '' }}
                  items={[
                    { label: 'Nenhum', value: '' },
                    ...anomaliasTipos.map(tipo => ({
                      label: tipo.name,
                      value: String(tipo.id),
                    })),
                  ]}
                  style={{
                    inputIOS: {
                      color: '#222',
                      fontSize: 16,
                      backgroundColor: '#eee',
                      borderRadius: 6,
                      paddingVertical: 14,
                      paddingHorizontal: 12,
                      paddingRight: 36,
                      marginBottom: 4,
                    },
                    inputAndroid: {
                      color: '#222',
                      fontSize: 16,
                      backgroundColor: '#eee',
                      borderRadius: 6,
                      paddingVertical: 14,
                      paddingHorizontal: 12,
                      paddingRight: 36,
                      marginBottom: 4,
                    },
                    iconContainer: {
                      top: 12,
                      right: 16,
                    },
                  }}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => (
                    <MaterialIcons name="arrow-drop-down" size={24} color="#888" />
                  )}
                />
              </View>

              <Text style={{ marginBottom: 8 }}>Descrição</Text>
              <View style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 16, padding: 8 }}>
                <TextInput
                  placeholder="Descreva as anomalias, se existirem..."
                  value={anomaliasCheckout}
                  onChangeText={setAnomaliasCheckout}
                  multiline
                  style={{ minHeight: 60, textAlignVertical: 'top' }}
                />
              </View>

              <TouchableOpacity
                style={{ backgroundColor: '#e74c3c', borderRadius: 6, paddingVertical: 12, alignItems: 'center', marginBottom: 10 }}
                onPress={handleConfirmCheckout}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Confirmar Check-out</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => {
                  setCheckoutModalVisible(false);
                  setAnomaliasCheckout('');
                  setAnomaliaTipoSelecionadaCheckout('');
                  setReservaCheckout(null);
                }}
              >
                <Text style={{ color: '#b30000' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Provider>
  );
}