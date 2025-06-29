import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    
    overlay: {
        ...StyleSheet.absoluteFillObject, // Faz o overlay cobrir toda a tela
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },

    containerLogo: {
        width: width * 0.8,
        height: height * 0.9,
        resizeMode: 'cover',
        alignSelf: 'center',
    },

    loginImage: {
        width: width * 1,
        height: height * 0.45,
        position: 'absolute',
        bottom: height * 0.40,
        right: -width * 0.12,
    },


    textWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: width * 0.06,
        bottom: height * 0.25,
    },

    title: {
        fontSize: width * 0.10,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'left',
        bottom: height * 0.012,
        fontFamily: 'Poppins-Bold',
    },

    buttonWrapper: {
        position: "absolute",
        bottom: height * 0.06,
        width: "100%",
        alignItems: "center",
    },
    
    buttonContainer: {
        width: width * 0.85,
        borderRadius: width * 0.06,
        overflow: 'hidden',
        marginBottom: height * 0.018,
        bottom: height * 0.06,
        alignSelf: 'center'
    },

    button: {
        paddingVertical: height * 0.018,
        alignItems: 'center',
        borderRadius: width * 0.06,
    },

    buttonText: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Poppins-Bold',
    },
});

export default styles;
