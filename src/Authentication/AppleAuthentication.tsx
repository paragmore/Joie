
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {ImageContainer, LoginButtonContainer} from './Authentication.styles';
import auth from '@react-native-firebase/auth';
import {APPLE_ICON} from '../Assets';
import {style} from './style';
import {appleAuth} from '@invertase/react-native-apple-authentication';

export const AppleAuthentication = () => {
  const [userInfo, setUserInfo] = useState({});
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
      console.log('error>>>', error);
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
