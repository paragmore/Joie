import {StyleSheet} from 'react-native';
import {fontResize} from '../Util/font';
export const style = StyleSheet.create({
  container: {
    width: '40%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#fff',
    width: '50%',
    fontSize: fontResize(14),
    lineHeight: fontResize(20),
  },
});
