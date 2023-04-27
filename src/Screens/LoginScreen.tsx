import React from 'react';
import {View, Text, Platform} from 'react-native';
import {GoogleAuthentication} from '../Authentication/GoogleAuthentication';
import {ScreenContainer} from '../Components/ScreenContainer';
import {FacebookAuthentication} from '../Authentication/FacebookAuthentication';
import {AppleAuthentication} from '../Authentication/AppleAuthentication';
import Strings from '../Util/Strings';
import style from './LoginScreen.style';
import Colors from '../Util/Colors';
import {fontResize} from '../Util/font';
import RouteName from '../Util/RouteName';
import {useNavigation} from '@react-navigation/native';

export const LoginScreen = () => {
  const navigation = useNavigation();
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

            <Text
              style={{
                color: Colors.WHITE[100],
                fontSize: fontResize(14),
                textAlign: 'left',
                fontFamily: 'PlayfairDisplay-Medium',
                lineHeight: 25,
                marginTop: 10,
              }}>
              {Strings.BY_CLICK_LOGIN}
              <Text
                onPress={() => navigation.navigate(RouteName.TERM_CONDITION)}
                style={{fontFamily: 'PlayfairDisplay-Bold', color: 'red'}}>
                {Strings.TERMS_CONDITIONS}
              </Text>
              {Strings.AND}
              <Text
                onPress={() => navigation.navigate(RouteName.PRIVACY_POLICY)}
                style={{fontFamily: 'PlayfairDisplay-Bold', color: 'red'}}>
                {Strings.PRIVACY_POLICY}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};
