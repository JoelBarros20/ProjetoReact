import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    sectionTitle: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    label: {
        color: '#000',
        marginBottom: 4,
    },

    fieldBlock: {
        marginBottom: 10,
    },

    inlineGroup: {
        flexDirection: 'row',
        gap: 12,
    },

    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: height * 0.01,
        marginBottom: height * 0.01,
        paddingHorizontal: width * 0.04,
        marginTop: height * 0.03
    },

    ContainerButtonOffers: {
        backgroundColor: '#b30000',
        paddingVertical: height * 0.012,
        borderRadius: width * 0.02,
        width: '100%',
        height: height * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
    },

    ButtonOfertas: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 12,
        marginBottom: 8,
        color: '#000', 
        backgroundColor: '#fff',
    },

});

export default styles