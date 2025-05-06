import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: height * 0.09,
        backgroundColor: '#b30000',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width * 0.04,
        justifyContent: 'space-between',

    },
    Menu: {
        width: width * 0.08,
        alignItems: 'flex-start',
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

    gridContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    gridItem: {
        width: (width / 2) - 30,
        height: width / 2.5,
        backgroundColor: '#fff',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    gridText: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    Container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
});

export default styles;