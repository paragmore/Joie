import React from 'react';
import {View, Text} from 'react-native';
import {GoogleAuthentication} from '../Authentication/GoogleAuthentication';
import {ScreenContainer} from '../Components/ScreenContainer';

export const LoginScreen = () => {
  return (
    <ScreenContainer
      isBackgroundScrollable={false}
      backgroundImageUrl={require('./../../assets/splash_background.png')}>
      <View
        style={{
          //   justifyContent: 'flex-end',
          display: 'flex',
          marginTop: '115%',
          padding: 10,
        }}>
        <Text>Log in</Text>
        <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
          <GoogleAuthentication />
          <GoogleAuthentication />
        </View>
      </View>
    </ScreenContainer>
  );
};
