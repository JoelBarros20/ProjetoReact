import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: '#FFF6F6',
        borderRadius: width * 0.04,
        padding: width * 0.04,
        marginBottom: height * 0.025,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },

    SecondContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    ThirdContainer: {
        flexDirection: 'row',
    },

    ImageStyle: {
        width: width * 0.30,
        height: width * 0.30,
        borderRadius: width * 0.03,
        marginRight: width * 0.03,
    },

    Text: {
        color: '#000',
        fontSize: width * 0.035,
    },

    TextBold: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: width * 0.04,
    },

    TextMargin: {
        color: '#000',
        marginBottom: height * 0.015,
        fontSize: width * 0.035,
    },

    AnimatedContainer: {
        borderTopWidth: 1,
        borderTopColor: '#444',
        paddingTop: height * 0.015,
    },
});

export default styles;
