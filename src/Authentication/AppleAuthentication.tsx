import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {ImageContainer, LoginButtonContainer} from './Authentication.styles';
import auth from '@react-native-firebase/auth';
import {APPLE_ICON} from '../Assets';
import {style} from './style';
import {appleAuth} from '@invertase/react-native-apple-authentication';

export const AppleAuthentication = () => {
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
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }

      // Create a Firebase credential from the response
      const {identityToken, nonce} = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      await auth().signInWithCredential(appleCredential);
      setUserInfo({appleAuthRequestResponse});
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

  return (
    <>
      <LoginButtonContainer flexDirection={'row'} onPress={signIn}>
        <View style={style.container}>
          <ImageContainer
            width={'18px'}
            height={'18px'}
            resizeMode={'contain'}
            source={APPLE_ICON}
          />
          <Text style={style.textStyle}>Apple</Text>
        </View>
      </LoginButtonContainer>
    </>
  );
};
