import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    containerLogo: {
        width: '90%',
        height: '100%',
        resizeMode: 'cover',
        alignSelf: 'center',
    },
    loginImage: {
        width: '120%',
        height: '100%',
        position: 'absolute',
        bottom: 230,
        right: -45,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, // Faz o overlay cobrir toda a tela
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    textWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 25,
        bottom: 200,
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'left',
        bottom: 10,
        fontFamily: 'Poppins-Bold',
    },
    subtitle: {
        fontSize: 28,
        bottom: 10,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        marginBottom: 40,
    },
    buttonWrapper: {
        position: "absolute",
        bottom: 50,
        width: "100%",
        alignItems: "center",
    },
    buttonContainer: {
        width: width * 0.85,
        borderRadius: 25,
        overflow: 'hidden',
        marginBottom: 15,
        bottom: 50,
        alignSelf: 'center'
    },
    button: {
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Poppins-Bold',
    },
});

export default styles;
