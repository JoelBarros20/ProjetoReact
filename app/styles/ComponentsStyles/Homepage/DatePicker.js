import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    TextInput: {
        backgroundColor: '#fff',
        borderRadius: width * 0.02,
        padding: width * 0.03,
        marginBottom: height * 0.015,
    },

    FirstTextContainer: {
        fontFamily: 'Poppins-Regular',
        marginBottom: height * 0.01,
    },

    FirstContainerDataInput: {
        flexDirection: 'row',
        gap: width * 0.02,
    },

    SecondTextContainer: {
        fontFamily: 'Poppins-Regular',
        marginBottom: height * 0.005,
    },

    FirstDateTimePicker: {
        backgroundColor: '#fff',
        borderRadius: width * 0.02,
        padding: width * 0.03,
    },

    ThridTextContainer: {
        fontFamily: 'Poppins-Regular',
        marginBottom: height * 0.005,
    },

    SecondDateTimePicker: {
        backgroundColor: '#fff',
        borderRadius: width * 0.02,
        padding: width * 0.03,
    },

    SecondContainerDataInput: {
        flexDirection: 'row',
        gap: width * 0.02,
        marginTop: height * 0.015,
    },

    FourthTextContainer: {
        fontFamily: 'Poppins-Regular',
        marginBottom: height * 0.005,
    },

    ThirdDateTimePicker: {
        backgroundColor: '#fff',
        borderRadius: width * 0.02,
        padding: width * 0.03,
    },

    FifhtTextContainer: {
        fontFamily: 'Poppins-Regular',
        marginBottom: height * 0.005,
    },

    FourthDateTimePicker: {
        backgroundColor: '#fff',
        borderRadius: width * 0.02,
        padding: width * 0.03,
    },

    FirstContainerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height * 0.025,
    },

    FirstButtonStyles: {
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.04,
        borderColor: '#b30000',
        borderWidth: 1,
        borderRadius: width * 0.02,
    },

    FirstButtonText: {
        color: '#b30000',
        fontWeight: 'bold',
    },

    SecondContainerButton: {
        backgroundColor: '#b30000',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.04,
        borderRadius: width * 0.02,
    },

    SecondButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

});

export default styles;
