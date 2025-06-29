import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    HeaderPage: {
        width: '100%',
        height: height * 0.09,
        backgroundColor: '#b30000',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.04,
        justifyContent: 'space-between',
        marginBottom: height * 0.02
    },

    SideMenu: {
        width: width * 0.08,
        alignItems: 'flex-start',
    },

    title: {
        color: '#FFF',
        fontSize: width * 0.05,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
    },

    spacer: {
        width: width * 0.08,
    },

    carBox: {
        backgroundColor: '#FFF6F6',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },

    imagePlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#444',
        marginRight: 16,
    },

    carInfoText: {
        flex: 1,
    },

    carTitle: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },

    carSubtitle: {
        color: '#000',
        fontSize: 12,
        marginVertical: 2,
    },

    carDays: {
        color: '#000',
        fontSize: 14,
    },

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

    optional: {
        color: '#000',
    },

    input: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderColor: '#000',
        borderWidth: 1,
        color: '#fff',
        marginBottom: 20,
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

export default styles