import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    Menu: {
        width: width * 0.08,
        alignItems: 'flex-start',
    },
    backgroundImage: {
        width: '100%',
        height: height * 0.09,
        backgroundColor: '#b30000',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.04,
        justifyContent: 'space-between',
    },
    Title: {
        color: '#FFF',
        fontSize: width * 0.05,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
    },
    spacer: {
        width: width * 0.08,
    },
    SubTitle: {
        color: '#000',
        fontSize: width * 0.045,
        fontFamily: 'Poppins-Bold',
        marginTop: height * 0.017,
        marginLeft: width * 0.04,
        marginBottom: height * 0.015,
    },
    Container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    ContainerCards: {
        backgroundColor: '#fdf3f3',
        borderRadius: width * 0.03,
        marginRight: width * 0.04,
        width: width * 0.92,
        paddingBottom: height * 0.015,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: height * 0.025,
    },
    ContainerInsideCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: width * 0.03,
        paddingTop: height * 0.015,
    },
    ContainerInsideButton: {
        backgroundColor: '#b30000',
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.012,
        borderRadius: width * 0.02,
        alignItems: 'center',
    },
    Image: {
        width: '100%',
        height: height * 0.25,
        borderTopLeftRadius: width * 0.03,
        borderTopRightRadius: width * 0.03,
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
    ButtonFilters: {
        backgroundColor: '#b30000',
        paddingVertical: height * 0.012,
        paddingHorizontal: width * 0.02,
        borderRadius: width * 0.02,
        width: width * 0.30,
        alignItems: 'center',
        marginBottom: height * 0.02,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: height * 0.01,
        marginBottom: height * 0.01,
        paddingHorizontal: width * 0.04,
    },
    ButtonOfertas: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22
    },
    ButtonFiltros: {
        color: '#fff',
        fontWeight: 'bold',
    },
    ContainerFilters: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.04,
    },

    ContainerAllContent: {
        marginLeft: width * 0.04,
        marginBottom: height * 0.025,
    },

    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalContent: {
        backgroundColor: "white",
        paddingBottom: height * 0.02,
        borderTopLeftRadius: width * 0.05,
        borderTopRightRadius: width * 0.05,
        height: height * 0.65,
        alignContent: 'center',
        flexDirection: 'column',
    },
    modalTitle: {
        fontSize: width * 0.045,
        fontWeight: "bold",
        marginBottom: height * 0.015,
        textAlign: 'center',
    },
    option: {
        paddingVertical: height * 0.015,
    },
    optionText: {
        fontSize: width * 0.04,
        paddingHorizontal: width * 0.04,
    },
    cancelButton: {
        marginTop: height * 0.015,
        paddingVertical: height * 0.015,
        alignItems: "center",
    },
    cancelText: {
        color: "red",
        fontWeight: "bold",
        fontSize: width * 0.04,
    },
    modalHeader: {
        backgroundColor: '#b30000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.015,
        borderTopLeftRadius: width * 0.05,
        borderTopRightRadius: width * 0.05,
    },
    modalHeaderTitle: {
        fontWeight: 'bold',
        fontSize: width * 0.045,
        color: '#fff',
        textAlign: 'center',
        flex: 1,
    },
    modalHeaderClear: {
        color: '#fff',
        textDecorationLine: 'underline',
        fontSize: width * 0.038,
    },
    sortButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: width * 0.02,
        paddingHorizontal: width * 0.04,
        marginBottom: height * 0.03,
    },
    sortButton: {
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.03,
        borderRadius: width * 0.025,
        backgroundColor: '#b30000',
        alignItems: 'center',
        width: width * 0.35,
        flexShrink: 0,
    },
    sortButtonActive: {
        backgroundColor: '#fff',
        borderColor: '#b30000',
        borderWidth: 1,
    },
    sortButtonText: {
        color: '#fff',
        fontSize: width * 0.035,
        fontWeight: '500',
    },
    sortButtonTextActive: {
        color: '#000',
        fontWeight: 'bold',
    },
    dragZone: {
        width: width * 0.15,
        height: height * 0.008,
        backgroundColor: '#ccc',
        borderRadius: 10,
    },
    modalHeaderSwipe: {
        width: '100%',
        height: height * 0.04,
        justifyContent: 'center',
        alignItems: 'center',
    },

    searchContainer: {
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },

    searchBar: {
        borderRadius: 10,
        borderRadius: width * 0.02,
        borderColor: '#000',
        borderWidth: 1,
        height: height * 0.05,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        paddingVertical: 0
    },
});

export default styles;
