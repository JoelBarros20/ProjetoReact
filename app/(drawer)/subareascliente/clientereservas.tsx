import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import styles from '../../styles/Customer/ReservasCliente';
import { Searchbar, Menu, Button, Provider } from 'react-native-paper';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function ClienteReservasPage() {
  const { width, height } = Dimensions.get('window');

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [dataPesquisa, setDataPesquisa] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>('');
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
            {/* Contêiner horizontal */}
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
                    <Button onPress={() => setVisible(true)} mode="outlined" textColor='#000' labelStyle={{fontWeight:'normal'}}>
                      {selectedStatus || 'Selecione status'}
                    </Button>
                  }
                >
                  <Menu.Item onPress={() => { setSelectedStatus('Confirmada'); setVisible(false) }} title="Confirmada" />
                  <Menu.Item onPress={() => { setSelectedStatus('Concluída'); setVisible(false) }} title="Concluída" />
                  <Menu.Item onPress={() => { setSelectedStatus('Pendente'); setVisible(false) }} title="Pendente" />
                </Menu>

              </View>
            </View>
          </View>

          {/* Barra de pesquisa */}
          <View style={styles.ContainerAllContent}>
            <View style={{ paddingRight: height * 0.016 }}>
              <Searchbar
                placeholder="Pesquisar viaturas"
                value={searchQuery}
                inputStyle={{ fontSize: 14, paddingBottom: height * 0.021, textAlignVertical: 'center' }}
                onChangeText={(query) => setSearchQuery(query)}
                style={styles.searchBar}
              />
            </View>
          </View>

          {/* Modal do DateTime Picker */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(date) => {
              setDataPesquisa(date.toISOString().split('T')[0]);
              setDatePickerVisible(false);
            }}
            onCancel={() => setDatePickerVisible(false)}
            is24Hour={true}
            locale="pt-PT"
          />
        </View>
      </TouchableWithoutFeedback>
    </Provider>
  );
}
