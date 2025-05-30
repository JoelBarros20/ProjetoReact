import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    drawer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 250,
        backgroundColor: '#222',
        padding: 20,
        zIndex: 100,
    },
    link: {
        color: '#fff',
        fontSize: 18,
        marginVertical: 15,
    },
});

export default styles;