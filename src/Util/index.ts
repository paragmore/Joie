import {Platform, Dimensions} from 'react-native';

export const firstImage =
  'https://firebasestorage.googleapis.com/v0/b/joie-c2494.appspot.com/o/image%2028.png?alt=media&token=9cd1df9a-0317-46da-a993-471c3b1b0be3';
export const secondImage =
  'https://images.pexels.com/photos/1655166/pexels-photo-1655166.jpeg?auto=compress&cs=tinysrgb&w=800';

export const productSkus = Platform.select({
  ios: ['org.joieapp.oneYearsubscription', 'org.joieapp.onemonth'],

  android: ['org.joieapp.oneyearsubscription', 'org.joieapp.onemonth'],

  default: [],
}) as string[];

export const mxWidth = Dimensions.get('screen').width;
export const mxHeight = Dimensions.get('screen').height;
