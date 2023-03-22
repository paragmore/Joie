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
      isBackgroundScrollable={false}
      backgroundImageUrl={require('./../../assets/splash_background.png')}>
      <HeroText>JOIE</HeroText>
      <QuoteText>
        Keep smiling, because life is a beautiful thing and there's so much to
        smile about
      </QuoteText>
    </ScreenContainer>
  );
};
