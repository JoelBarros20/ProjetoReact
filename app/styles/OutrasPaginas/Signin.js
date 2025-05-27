import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    backgroundImage: {
        width: '100%',
        height: height * 0.35,
        resizeMode: 'cover',
    },

    svgBackground: {
        position: 'absolute',
        top: height * 0.22,
    },

    forgotPassword: {
        color: '#555',
    },

    loginButtonContainer: {
        alignItems: 'center',
        marginTop: height * 0.025,
    },

    loginButton: {
        paddingVertical: height * 0.018,
        paddingHorizontal: width * 0.04,
        borderRadius: width * 0.08,
        alignItems: 'center',
        width: width * 0.85,
    },

    loginText: {
        color: '#fff',
        fontSize: width * 0.04,
        fontWeight: 'bold',
    },

    signupText: {
        textAlign: 'center',
        marginTop: height * 0.02,
    },

    signupLink: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});

export default styles;
