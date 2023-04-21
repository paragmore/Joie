import React from 'react';
import {View, Text} from 'react-native';
import {GoogleAuthentication} from '../Authentication/GoogleAuthentication';
import {ScreenContainer} from '../Components/ScreenContainer';
import {FacebookAuthentication} from '../Authentication/FacebookAuthentication';
import {AppleAuthentication} from '../Authentication/AppleAuthentication';
import Strings from '../Util/Strings';
import style from './LoginScreen.style';

export const LoginScreen = () => {
  return (
    <ScreenContainer
      isBackgroundScrollable={false}
      isScrollView={false}
      backgroundImageUrl={require('./../../assets/splash_background.png')}>
      <Text style={style.titleText}>{Strings.JOIE}</Text>
      <View style={style.container}>
        <Text style={style.loginStyleText}>{Strings.LOGIN}</Text>
        <View style={style.loginButtonView}>
          <GoogleAuthentication />
          <FacebookAuthentication />
          <AppleAuthentication />
        </View>
      </View>
    </ScreenContainer>
  );
};
