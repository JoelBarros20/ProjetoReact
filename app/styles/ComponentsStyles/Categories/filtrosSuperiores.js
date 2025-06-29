import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    ContainerButtonFiltersTop: {
        backgroundColor: '#b30000',
        paddingVertical: height * 0.012,
        paddingHorizontal: width * 0.02,
        borderRadius: width * 0.02,
        width: width * 0.53,
        alignItems: 'center',
        marginBottom: height * 0.02,
        borderWidth: 1,
        borderColor: 'transparent', 
    },

    TextButtonFilters: {
        color: '#fff',
        fontWeight: 'bold',
    },


});


export default styles;
