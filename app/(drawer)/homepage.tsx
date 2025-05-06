import React, { useState, useEffect } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, ImageBackground, Text, TextInput, ScrollView, Image, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import useAuthGuard from '@/hooks/useAuthGuard';
import styles from '../styles/Homepage';
import { LinearGradient } from 'expo-linear-gradient';
import { API_ROUTES, BASE_URL } from '@/env';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FlatList } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

SplashScreen.preventAutoHideAsync();

type VehicleImage = {
  id: number;
  image_url: string;
};

const { height } = Dimensions.get('window');


export default function HomePageScreen() {

  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  const [loading] = useState(false);
  const navigation = useNavigation();
  const checkingToken = useAuthGuard();
  const [localizacao, setLocalizacao] = useState('');
  const [dataInicio, setDataInicio] = useState<string | null>(null);
  const [dataFim, setDataFim] = useState<string | null>(null);
  const [horaInicio, setHoraInicio] = useState<string | null>(null);
  const [horaFim, setHoraFim] = useState<string | null>(null);
  const [pickerType, setPickerType] = useState<'inicio' | 'fim' | 'horaInicio' | 'horaFim' | null>(null);
  const [images, setImages] = useState<VehicleImage[]>([]);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleConfirm = (selectedDate: Date) => {
    if (pickerType === 'inicio') {
      setDataInicio(formatDate(selectedDate));
    } else if (pickerType === 'fim') {
      setDataFim(formatDate(selectedDate));
    } else if (pickerType === 'horaInicio') {
      setHoraInicio(formatTime(selectedDate));
    } else if (pickerType === 'horaFim') {
      setHoraFim(formatTime(selectedDate));
    }
    setPickerType(null);
  };

  useEffect(() => {
    fetch(API_ROUTES.IMAGES)
      .then(res => res.json())
      .then((data) => {
        setImages(data);
      })
      .catch(() => { });
  }, []);

  if (!fontsLoaded || loading || checkingToken) return null;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: height * 0.02 }}
        bounces={false}
        overScrollMode="never">
        <ImageBackground source={require('../../assets/images/login_image.jpg')} style={styles.backgroundImage} blurRadius={8}>
          <LinearGradient colors={['#00000000', '#00000079']} style={styles.LinearGradient}>
            <Text style={styles.TextTitle}>Aluguer de carros</Text>
            <Text style={styles.TextSubtitle}>Ótimos carros a ótimos preços</Text>
            <View style={styles.ContainerInputs}>
              <Text style={styles.FirstTextContainer}>Localização do Stand</Text>
              <TextInput style={styles.TextInput} placeholder="Ex: Viseu" value={localizacao} onChangeText={setLocalizacao} />

              {/* Primeiro DatePicker */}
              <View style={styles.FirstContainerDataInput}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.SecondTextContainer}>Data de Levantamento</Text>
                  <TouchableOpacity onPress={() => setPickerType('inicio')}>
                    <View pointerEvents="none">
                      <TextInput value={dataInicio ?? ''} editable={false} placeholder="Seleciona a data" style={styles.FirstDateTimePicker} />
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Primeiro TimePicker */}
                <View style={{ flex: 1 }}>
                  <Text style={styles.ThridTextContainer}>Hora de Levantamento</Text>
                  <TouchableOpacity onPress={() => setPickerType('horaInicio')}>
                    <View pointerEvents="none">
                      <TextInput value={horaInicio ?? ''} editable={false} placeholder="hh:mm" style={styles.SecondDateTimePicker} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Segundo DatePicker */}
              <View style={styles.SecondContainerDataInput}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.FourthTextContainer}>Data de Entrega</Text>
                  <TouchableOpacity onPress={() => setPickerType('fim')}>
                    <View pointerEvents="none">
                      <TextInput value={dataFim ?? ''} editable={false} placeholder="Seleciona a data" style={styles.ThirdDateTimePicker} />
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Segundo TimePicker */}
                <View style={{ flex: 1 }}>
                  <Text style={styles.FifhtTextContainer}>Hora de Entrega</Text>
                  <TouchableOpacity onPress={() => setPickerType('horaFim')}>
                    <View pointerEvents="none">
                      <TextInput value={horaFim ?? ''} editable={false} placeholder="hh:mm" style={styles.FourthDateTimePicker} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Primeiro Button */}
              <View style={styles.FirstContainerButton}>
                <TouchableOpacity style={styles.FirstButtonStyles}
                  onPress={() => {
                    setLocalizacao('');
                    setDataInicio(null);
                    setDataFim(null);
                    setHoraInicio(null);
                    setHoraFim(null);
                  }}>
                  <Text style={styles.FirstButtonText}>Limpar campos</Text>
                </TouchableOpacity>

                {/* Segundo Button */}
                <TouchableOpacity style={styles.SecondContainerButton}>
                  <Text style={styles.SecondButtonText}>Pesquisar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.ContainerOffers}>
          <View style={{ marginTop: 5 }}>
            <Text style={styles.TextOffers}>Veiculos</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.ContainerButtonOffers}
              onPress={() => router.push('/categoriespage')}>
              <Text style={styles.ButtonOfertas}>Ver</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <FlatList data={images} keyExtractor={(item) => item.id.toString()} horizontal showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
            renderItem={({ item }) => {
              const imageUrl = `${BASE_URL}${item.image_url}`;
              return (
                <View style={styles.ContainerCards}>
                  <Image source={{ uri: imageUrl }} style={styles.Image} resizeMode="cover" />
                  <View style={{ paddingHorizontal: 10, paddingTop: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>Peugeot 208</Text>
                    <Text style={{ fontSize: 13, color: '#999' }}>ou Similar | Económico</Text>
                  </View>
                  <View style={styles.ContainerInsideCard}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>€150.00</Text>
                    <TouchableOpacity style={styles.ContainerInsideButton}
                      onPress={() => router.push('/viaturasdetalhes')}>
                      <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ver</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>

        <View style={styles.Menu}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <MaterialIcons name="menu" size={30} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Modal DateTimePicker */}
        <DateTimePickerModal isVisible={pickerType !== null} mode={pickerType?.includes('hora') ? 'time' : 'date'} date={new Date()}
          onConfirm={handleConfirm}
          onCancel={() => setPickerType(null)}
          is24Hour={true}
          locale="pt-PT"
        />
      </ScrollView>
    </View >
  );
}
