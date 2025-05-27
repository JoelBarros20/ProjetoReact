import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    backgroundImage: {
        width: '100%',
        height: height * 0.35,
        resizeMode: 'cover',
    },

    svgBackground: {
        position: 'absolute',
        top: height * 0.22,
    },

    content: {
        flex: 1,
        padding: width * 0.06,
        top: height * 0.025,
    },

    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.08,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    subtitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.035,
        textAlign: 'center',
        color: '#777',
        marginBottom: height * 0.025,
    },

    label: {
        fontSize: width * 0.035,
        marginTop: height * 0.012,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: width * 0.02,
        paddingHorizontal: width * 0.025,
        marginTop: height * 0.006,
    },

    input: {
        flex: 1,
        padding: width * 0.025,
    },

    icon: {
        marginRight: width * 0.025,
    },

    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: height * 0.012,
    },

    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
