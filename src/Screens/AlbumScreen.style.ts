import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../Util/Colors';
const {height, width} = Dimensions.get('screen');
const style = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
});

export default style;
