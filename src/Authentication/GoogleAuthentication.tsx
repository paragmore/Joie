import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {ImageContainer, LoginButtonContainer} from './Authentication.styles';
import auth from '@react-native-firebase/auth';
import {GOOGLE_ICON} from '../Assets';
import {style} from './style';

const {width, height} = Dimensions.get('screen');

export const GoogleAuthentication = () => {
  const [userInfo, setUserInfo] = useState({});
  //   const [error, setError] = useState({});
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '176344180297-3kpvha6dtasqh5m9pmgba1jat0i3v9so.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();
      const {idToken} = userInfo;
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        token.accessToken,
      );
      await auth().signInWithCredential(credential);

      setUserInfo({userInfo});
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('error', error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('error', error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('error', error);
        // play services not available or outdated
      } else {
        console.log('error', error);
        // some other error happened
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo({user: null}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <LoginButtonContainer flexDirection={'row'} onPress={signIn}>
        <View style={style.container}>
          <ImageContainer
            resizeMode={'contain'}
            width={'18px'}
            height={'18px'}
            source={GOOGLE_ICON}
          />
          <Text style={style.textStyle}>Google</Text>
        </View>
      </LoginButtonContainer>
    </>
  );
};
