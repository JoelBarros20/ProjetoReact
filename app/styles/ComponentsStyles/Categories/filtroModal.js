import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    ModalFilters: {
        justifyContent: "flex-end",
        margin: 0,
    },

    modalContent: {
        backgroundColor: "white",
        paddingBottom: height * 0.02,
        borderTopLeftRadius: width * 0.05,
        borderTopRightRadius: width * 0.05,
        height: height * 0.66,
        alignContent: 'center',
        flexDirection: 'column',
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

    modalHeaderClearButton: {
        color: '#fff',
        fontSize: width * 0.038,
    },

    optionText: {
        fontSize: width * 0.04,
        paddingHorizontal: width * 0.04,
    },

    ModalFiltersButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: width * 0.02,
        paddingHorizontal: width * 0.04,
        marginBottom: height * 0.03,
    },

    ExtrasButtonActive: {
        backgroundColor: '#fff',
        borderColor: '#b30000',
        borderWidth: 1,
    },

    ExtrasButtonText: {
        color: '#fff',
        fontSize: width * 0.035,
        fontWeight: '500',
    },

    ExtrasButtonTextActive: {
        color: '#000',
    },

    ExtrasButton: {
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.03,
        borderRadius: width * 0.025,
        backgroundColor: '#b30000',
        alignItems: 'center',
        width: width * 0.35,
        borderWidth: 1,
        borderColor: 'transparent',
    },

    SeatsButtonActive: {
        backgroundColor: '#fff',
        borderColor: '#b30000',
        borderWidth: 1,
    },

    SeatsButtonText: {
        color: '#fff',
        fontSize: width * 0.035,
        fontWeight: '500',
    },

    SeatsButtonTextActive: {
        color: '#000',
        fontWeight: 'bold',
    },

    SeatsButton: {
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.03,
        borderRadius: width * 0.025,
        backgroundColor: '#b30000',
        alignItems: 'center',
        width: width * 0.35,
        borderWidth: 1,
        borderColor: 'transparent',
    },

    ViewContainerApplyFilters: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: height * 0.01,
        marginBottom: height * 0.03,
        paddingHorizontal: width * 0.04,
    },

    ContainerButtonApplyFilters: {
        backgroundColor: '#b30000',
        paddingVertical: height * 0.012,
        borderRadius: width * 0.02,
        width: '100%',
        height: height * 0.07,
        alignItems: 'center',
        justifyContent: 'center',

    },

    TextButtonApplyFilters: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22
    },

    FuelsButtonActive: {
        backgroundColor: '#fff',
        borderColor: '#b30000',
        borderWidth: 1,
    },

    FuelsButtonText: {
        color: '#fff',
        fontSize: width * 0.035,
        fontWeight: '500',
    },

    FuelsButtonTextActive: {
        color: '#000',
        fontWeight: 'bold',
    },

    FuelsButton: {
        paddingHorizontal: width * 0.03,
        paddingVertical: height * 0.015,
        borderRadius: width * 0.025,
        backgroundColor: '#b30000',
        alignItems: 'center',
        width: width * 0.35,
        borderWidth: 1,
        borderColor: 'transparent',
    },

    DoorsButtonActive: {
        backgroundColor: '#fff',
        borderColor: '#b30000',
        borderWidth: 1,
    },

    DoorsButtonText: {
        color: '#fff',
        fontSize: width * 0.035,
        fontWeight: '500',
    },

    DoorsButtonTextActive: {
        color: '#000',
        fontWeight: 'bold',
    },

    DoorsButton: {
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.03,
        borderRadius: width * 0.025,
        backgroundColor: '#b30000',
        alignItems: 'center',
        width: width * 0.35,
        borderWidth: 1,
        borderColor: 'transparent',

    },

});

export default styles;
