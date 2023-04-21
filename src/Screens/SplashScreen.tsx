import React from 'react';
import {View} from 'react-native';
import {ScreenContainer} from '../Components/ScreenContainer';
import {
  HeroText,
  QuoteText,
} from '../Components/SplashScreen/SplashScreen.styles';

export const SplashScreen = () => {
  return (
    <ScreenContainer
      isScrollView={false}
      isBackgroundScrollable={false}
      backgroundImageUrl={require('./../../assets/splash_background.png')}>
      <HeroText style={{marginTop: '150%',}}>JOIE</HeroText>
      <QuoteText>
        Keep smiling, because life is a beautiful thing and there's so much to
        smile about
      </QuoteText>
    </ScreenContainer>
  );
};
