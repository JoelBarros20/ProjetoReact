import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    DrawerContent: {
        backgroundColor: '#b30000',
        width: '100%',
        paddingTop: height * 0.015,
        paddingLeft: width * 0.025,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    ContainerImage: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    Image: {
        width: width * 0.12,
        height: width * 0.12,
        borderRadius: width * 0.08,
        marginBottom: height * 0.012,
    },

    TextImage: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: width * 0.025,
        marginBottom: height * 0.012,
        fontSize: width * 0.04,
    },

    ButtonLogout: {
        marginRight: width * 0.015,
    },

    ButtonText: {
        marginRight: width * 0.04,
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },

    containerButtonIcon : {
        marginBottom: height * 0.012,
        flexDirection: 'row',
        alignItems: 'center'
    },

    AccordionStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.04,
    },

    CategoryIcon: {
        color: '#fff',
        marginLeft: width * 0.04,
        fontSize: width * 0.035,
        flex: 1,
    },
});

export default styles;
