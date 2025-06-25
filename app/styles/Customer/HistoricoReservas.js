import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#FFF',
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

    SubTitle: {
        color: '#000',
        fontSize: width * 0.045,
        fontFamily: 'Poppins-Bold',
        marginTop: height * 0.017,
        marginLeft: width * 0.04,
        marginBottom: height * 0.015,
    },

    containerFilters: {
        flexDirection: 'row',
        paddingHorizontal: width * 0.04,
        marginBottom: height * 0.015,
    },

    FirstContainerDataInput: {
        flexDirection: 'row',
        gap: width * 0.02,
    },

    FirstDateTimePicker: {
        backgroundColor: '#fff',
        borderRadius: width * 0.02,
        borderColor: '#000',
        borderWidth: 1,
        width: width * 0.928,
        height: height * 0.05,
        alignItems: 'center',
        flexDirection: 'row'
    },

    ContainerAllContent: {
        marginLeft: width * 0.04,
        marginBottom: height * 0.025,
    },

    searchBar: {
        borderRadius: width * 0.02,
        borderColor: '#000',
        borderWidth: 1,
        height: height * 0.05,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        paddingVertical: 0,
    },

    dropdownButton: {
        borderRadius: width * 0.02,
        borderColor: '#000',
        borderWidth: 1,
        width: width * 0.45,
    },

    ListTitle: {
        color: '#000',
        fontSize: width * 0.045,
        fontFamily: 'Poppins-Bold',
        marginLeft: width * 0.04,
    },
});

export default styles;
