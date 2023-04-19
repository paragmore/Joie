import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../Util/Colors';
const {height} = Dimensions.get('screen');
const style = StyleSheet.create({
  container: {
    marginTop: height * 0.5,
    padding: 10,
  },
  loginStyleText: {
    color: Colors.WHITE[100],
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonView: {
    display: 'flex',
    gap: 10,
    width: '80%',
    marginHorizontal: '10%',
  },
});

export default style;
