import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    SideMenu: {
        width: width * 0.08,
        alignItems: 'flex-start',
    },
});

export default styles