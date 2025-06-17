import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

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

    Image: {
        width: '100%',
        height: height * 0.25,
        borderTopLeftRadius: width * 0.03,
        borderTopRightRadius: width * 0.03,
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
        width: width * 0.25,
    },

});


export default styles;
