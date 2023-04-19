import {Dimensions, PixelRatio, Platform} from 'react-native';
export function fontResize(fontSize: number) {
  const DEFAULT_RESIZE_SCREEN = Dimensions.get('screen').width,
    SCREEN_WIDTH = Dimensions.get('screen').width,
    scale = SCREEN_WIDTH / DEFAULT_RESIZE_SCREEN,
    newSize = fontSize * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
}
