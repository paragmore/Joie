import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../Util/Colors';
import {fontResize} from '../Util/font';
const {height, width} = Dimensions.get('screen');
const style = StyleSheet.create({
  mainContainer: {
    height: height,
    width: width,
  },
  container: {
    position: 'absolute',
    bottom: '5%',
    // padding: 10,
  },
  loginStyleText: {
    color: Colors.WHITE[100],
    fontSize: 24,
    marginBottom: '5%',
    fontFamily: 'Poppins-Medium',
    marginLeft: '10%',
  },
  loginButtonView: {
    display: 'flex',
    gap: 10,
    width: width * 0.8,
    marginHorizontal: width * 0.1,
  },
  titleText: {
    fontSize: fontResize(40),
    fontFamily: 'PlayfairDisplay-SemiBold',
    lineHeight: fontResize(53),
    textAlign: 'center',
    color: Colors.PRIMARY[100],
    marginTop: '10%',
  },
});

export default style;
