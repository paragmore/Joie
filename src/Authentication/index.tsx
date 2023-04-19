import {Settings} from 'react-native-fbsdk-next';
export const configureFacebook = () => {
  // setting up the app ID
  Settings.setAppID('245242334663978');
  Settings.initializeSDK();
};
