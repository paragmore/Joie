import React, {useState} from 'react';
import {View, Text, Platform} from 'react-native';
import {ImageContainer, LoginButtonContainer} from './Authentication.styles';
import auth from '@react-native-firebase/auth';
import {FACEBOOK_ICON} from '../Assets';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {style} from './style';

export const FacebookAuthentication = () => {
  const [userInfo, setUserInfo] = useState({});
  //   const [error, setError] = useState({});
  const signIn = async () => {
    try {
      if (Platform.OS === 'android') {
        LoginManager.setLoginBehavior('web_only');
      }

      LoginManager.logOut();
      LoginManager.logInWithPermissions(['public_profile', 'email'])
        .then(result => {
          if (result.isCancelled) {
            console.log('facebook Login cancelled');
          }
        })
        .then(() => {
          const infoRequest = new GraphRequest(
            '/me?fields=id,name,email,picture',
            undefined,
            (error, result) => {
              if (error) {
                console.log('Error fetching data: ', error);
                console.log(error);
              } else {
                //   resolve(result);
                AccessToken.getCurrentAccessToken().then(async (data: any) => {
                  let token = data.accessToken.toString();

                  const facebookCredential =
                    auth.FacebookAuthProvider.credential(token);
                  await auth().signInWithCredential(facebookCredential);

                  setUserInfo({result});

                });
              }
            },
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error: any) {}
  };

  return (
    <>
      <LoginButtonContainer flexDirection={'row'} onPress={signIn}>
        <View style={style.container}>
          <ImageContainer
            resizeMode={'contain'}
            width={'18px'}
            height={'18px'}
            marginRight={20}
            source={FACEBOOK_ICON}
          />
          <Text style={style.textStyle}>Facebook</Text>
        </View>
      </LoginButtonContainer>
    </>
  );
};
