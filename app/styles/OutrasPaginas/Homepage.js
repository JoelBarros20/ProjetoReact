import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  backgroundImage: {
    width: '100%',
    height: height * 0.65,
    resizeMode: 'cover',
    borderBottomLeftRadius: width * 0.1,
    borderBottomRightRadius: width * 0.1,
    overflow: 'hidden',
  },

  TextTitle: {
    color: '#fff',
    fontSize: width * 0.075,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: height * 0.08,
  },

  TextSubtitle: {
    color: '#fff',
    fontSize: width * 0.035,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },

  LinearGradient: {
    padding: width * 0.05,
    paddingBottom: height * 0.03,
    justifyContent: 'center',
  },

  ContainerInputs: {
    backgroundColor: '#ffffffaa',
    padding: width * 0.04,
    borderRadius: width * 0.03,
    marginTop: height * 0.025,
  },

  Menu: {
    position: 'absolute',
    top: height * 0.025,
    left: width * 0.05,
    zIndex: 10,
    backgroundColor: '#FFF',
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: width * 0.065,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },

  ContainerOffers: {
    flexDirection: 'row',
    paddingHorizontal: width * 0.055,
    marginTop: height * 0.025,
    marginRight: width * 0.03,
    justifyContent: 'space-between',
    marginBottom: height * 0.03,
  },

  TextOffers: {
    fontFamily: 'Poppins-Bold',
    fontSize: width * 0.055,
    marginBottom: height * 0.01,
    marginLeft: width * 0.03,
    color: '#333',
  },

  ContainerButtonOffers: {
    backgroundColor: '#b30000',
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.04,
    borderRadius: width * 0.02,
    width: width * 0.25,
    alignItems: 'center',
  },

  ButtonOfertas: {
    color: '#fff',
    fontWeight: 'bold',
  },

  Image: {
    width: '100%',
    height: height * 0.25,
    borderTopLeftRadius: width * 0.03,
    borderTopRightRadius: width * 0.03,
  },

  ContainerCards: {
    backgroundColor: '#FFF6F6',
    borderRadius: width * 0.03,
    marginRight: width * 0.04,
    width: width * 0.8,
    paddingBottom: height * 0.015,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
    width: width * 0.25,
    alignItems: 'center',
  },
});

export default styles;
