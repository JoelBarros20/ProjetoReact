import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
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
        backgroundColor: '#F5F4F9'
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111',
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
        color: '#111',
        marginLeft: width * 0.015
    },
    sectionBox: {
        padding: width * 0.05,
        backgroundColor: '#FFF'
    },
    sectionTitle: {
        color: '#111',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: width * 0.01
    },
    optionTitle: {
        color: '#111',
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
        backgroundColor: "#b30000",
        borderRadius: width * 0.025,
        paddingVertical: height * 0.017,
        alignItems: "center",
        marginTop: height * 0.005,
        width: width * 0.9,
    },

    ButtonOfertas: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: width * 0.045,
    },
});

export default styles;
