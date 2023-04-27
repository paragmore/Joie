import React from 'react';
import {View} from 'react-native';
import {ScreenContainer} from '../Components/ScreenContainer';
import {
  HeroText,
  QuoteText,
} from '../Components/SplashScreen/SplashScreen.styles';
import {mxHeight, mxWidth} from '../Util';

export const SplashScreen = () => {
  return (
    <ScreenContainer
      isScrollView={false}
      isBackgroundScrollable={false}
      isBackgroundImage={true}
      backgroundImageUrl={require('./../../assets/splash_background.png')}>
      <View style={{width: mxWidth, height: mxHeight}}>
        <View style={{position: 'absolute', bottom: '15%'}}>
          <HeroText>JOIE</HeroText>
          <QuoteText>
            Keep smiling, because life is a beautiful thing and there's so much
            to smile about
          </QuoteText>
        </View>
      </View>
    </ScreenContainer>
  );
};
