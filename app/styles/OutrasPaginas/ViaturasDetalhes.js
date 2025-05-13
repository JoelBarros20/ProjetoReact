import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111'
    },
    spacer: {
        width: width * 0.08,
    },
    backgroundImage: {
        width: '100%',
        height: height * 0.09,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.04,
        justifyContent: 'space-between',
    },
    imageContainer: {
        height: height * 0.3,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center'
    },
    carImage: {
        width: width * 0.9,
        height: height * 0.22,
    },
    infoSection: {
        padding: width * 0.05,
        backgroundColor: '#222'
    },
    greenText: {
        color: 'green',
        marginBottom: height * 0.01
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: height * 0.007
    },
    subtitle: {
        fontSize: 14,
        color: '#aaa',
        marginBottom: height * 0.02
    },
    specsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: width * 0.04
    },
    specItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
        marginVertical: height * 0.006
    },
    specText: {
        color: '#fff',
        marginLeft: width * 0.015
    },
    sectionBox: {
        padding: width * 0.05,
        backgroundColor: '#111'
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: width * 0.01
    },
    optionTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: height * 0.02,
    },

    containerPrice: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    Menu: {
        width: width * 0.08,
        alignItems: 'flex-start',
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
});

export default styles;
