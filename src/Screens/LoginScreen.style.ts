import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../Util/Colors';
import {fontResize} from '../Util/font';
const {height} = Dimensions.get('screen');
const style = StyleSheet.create({
  container: {
    marginTop: height * 0.55,
    padding: 10,
  },
  loginStyleText: {
    color: Colors.WHITE[100],
    fontSize: 24,
    marginBottom: '5%',
    fontFamily: 'Poppins-Medium',
  },
  loginButtonView: {
    display: 'flex',
    gap: 10,
    width: '80%',
    marginHorizontal: '10%',
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
