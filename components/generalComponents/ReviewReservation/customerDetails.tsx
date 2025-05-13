import React, { useState, useRef } from 'react';
import { View, Text, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../../../app/styles/ComponentsStyles/ReviewReservation/reviewCarDetails';
import RNPickerSelect from 'react-native-picker-select';

export default function CustomerDetails() {
    const [country, setCountry] = useState(null);
    return (

        <View>
            <Text style={styles.sectionTitle}>Driver details</Text>

            <View style={styles.fieldBlock}>
                <Text style={styles.label}>Company name <Text style={styles.optional}>(optional)</Text></Text>
                <TextInput style={styles.input} placeholder="" placeholderTextColor="#999" />
            </View>

            <View style={styles.inlineGroup}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>First name</Text>
                    <TextInput style={styles.input} value="Joel" placeholderTextColor="#999" />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Last name</Text>
                    <TextInput style={styles.input} value="Barros" placeholderTextColor="#999" />
                </View>
            </View>

            <View style={styles.fieldBlock}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} value='' placeholderTextColor="#999" />
            </View>

            <View style={styles.inlineGroup}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Country</Text>
                    <View style={styles.input}>
                        <RNPickerSelect
                            value={country}
                            onValueChange={(value) => setCountry(value)}
                            items={[{ label: 'Portugal', value: 'PT' }, { label: 'Spain', value: 'ES' }]}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: 'Select country', value: null }}
                            style={{ inputIOS: { color: '#fff' }, inputAndroid: { color: '#fff' } }}
                            Icon={() => <FontAwesome name="chevron-down" size={16} color="#999" />}
                        />
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Cell phone number</Text>
                    <TextInput style={styles.input} placeholderTextColor="#999" />
                </View>
            </View>
        </View>
    )
}