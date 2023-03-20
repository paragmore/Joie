import React from 'react';
import {ScreenContainer} from '../Components/ScreenContainer';
import {AlbumCardsList} from '../Components/AlbumCardsList';
import {Text} from 'react-native';

export const HomeScreen = () => {
  return (
    <>
      <ScreenContainer
        backgroundImageUrl={require('./../../assets/home_background.png')}
        // backgroundVideoUrl={
        //   'https://firebasestorage.googleapis.com/v0/b/joie-c2494.appspot.com/o/pexels-tima-miroshnichenko-5992586.mp4?alt=media&token=1132e745-f34c-4276-bee0-19b149821e05'
        // }
      >
        <Text>Welcome, Jessica</Text>
        <AlbumCardsList />
      </ScreenContainer>
    </>
  );
};
