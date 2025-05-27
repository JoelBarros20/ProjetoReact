import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    title: {
        fontSize: width * 0.055,
        fontWeight: "bold",
        marginBottom: height * 0.022,
        marginTop: height * 0.01,
        letterSpacing: -0.5,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: width * 0.035,
        padding: width * 0.045,
        marginBottom: height * 0.022,
        elevation: 2,
        borderColor: "#eee",
        borderWidth: 1,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    radioCircle: {
        height: width * 0.055,
        width: width * 0.055,
        borderRadius: width * 0.0275,
        borderWidth: 2,
        borderColor: "#bbb",
        alignItems: "center",
        justifyContent: "center",
        marginRight: width * 0.03,
    },

    radioSelected: {
        width: width * 0.03,
        height: width * 0.03,
        borderRadius: width * 0.015,
        backgroundColor: "#b30000",
    },

    cardTitle: {
        fontWeight: "bold",
        fontSize: width * 0.04,
        flex: 1,
    },

    price: {
        fontWeight: "bold",
        fontSize: width * 0.045,
        marginTop: height * 0.01,
        marginRight: width * 0.025,
    },

    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#eee",
        padding: width * 0.04,
        paddingBottom: height * 0.03,
    },

    totalLabel: {
        fontSize: width * 0.045,
        fontWeight: "bold",
        flex: 1,
    },

    totalValue: {
        fontSize: width * 0.045,
        fontWeight: "bold",
    },

    priceDetails: {
        color: "#222",
        textDecorationLine: "underline",
        marginTop: height * 0.002,
        marginBottom: height * 0.015,
        fontWeight: "500",
    },

    continueButton: {
        backgroundColor: "#b30000",
        borderRadius: width * 0.025,
        paddingVertical: height * 0.017,
        alignItems: "center",
        marginTop: height * 0.005,

    },

    continueText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: width * 0.045,
    },
});

export default styles;