import React from 'react';
import {ScreenContainer} from '../Components/ScreenContainer';
import {AlbumCardsList} from '../Components/AlbumCardsList';
import {ScrollView, Text} from 'react-native';
import {WelcomeText} from '../Components/HomeScreen/HomeScreen.styles';
import {MediaPlayerOverlay} from '../Components/MediaPlayerOverlay';

export const HomeScreen = () => {
  return (
    <>
      <ScreenContainer
        backgroundImageUrl={require('./../../assets/home_background.png')}
        // backgroundVideoUrl={
        //   'https://firebasestorage.googleapis.com/v0/b/joie-c2494.appspot.com/o/pexels-tima-miroshnichenko-5992586.mp4?alt=media&token=1132e745-f34c-4276-bee0-19b149821e05'
        // }
      >
        <ScrollView>
          <WelcomeText>Welcome, {'\n'} Jessica</WelcomeText>
          <AlbumCardsList />
          <AlbumCardsList header="Recommended collections" />
          <AlbumCardsList header="Mental fitness" />
        </ScrollView>
      </ScreenContainer>
    </>
  );
};
