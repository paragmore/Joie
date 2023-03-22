import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {Button, Text} from 'react-native';
import {LoginButtonContainer} from './Authentication.styles';
import auth from '@react-native-firebase/auth';

export const GoogleAuthentication = () => {
  const [userInfo, setUserInfo] = useState({});
  //   const [error, setError] = useState({});
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '176344180297-3kopi4ebr7gl18j3qo6dd9hi2p5tu7o4.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);
  const signIn = async () => {
    try {
      console.log('signiN');
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();
      const {idToken} = userInfo;
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        token.accessToken,
      );
      await auth().signInWithCredential(credential);

      console.log(userInfo);
      setUserInfo({userInfo});
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
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
      <LoginButtonContainer onPress={signIn}>
        <Text> Google</Text>
      </LoginButtonContainer>
    </>
  );
};
