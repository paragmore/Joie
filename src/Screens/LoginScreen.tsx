import React from 'react';
import {View, Text, Platform} from 'react-native';
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
      isBackgroundImage={true}
      backgroundImageUrl={require('./../../assets/splash_background.png')}>
      <View style={style.mainContainer}>
        <Text style={style.titleText}>{Strings.JOIE}</Text>
        <View style={style.container}>
          <Text style={style.loginStyleText}>{Strings.LOGIN}</Text>
          <View style={style.loginButtonView}>
            <GoogleAuthentication />
            <FacebookAuthentication />
            {Platform.OS === 'ios' && <AppleAuthentication />}
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};
