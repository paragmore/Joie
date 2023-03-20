import React from 'react';
import {Dimensions, Image, Text} from 'react-native';
import {Header} from '../Components/Header';
import SearchIcon from '../../assets/search_icon.svg';
import Video from 'react-native-video';
import {useHeaderHeight} from '@react-navigation/elements';
import {ScreenContainer} from '../Components/ScreenContainer';
import { AlbumCardsList } from '../Components/AlbumCardsList';

const {height, width} = Dimensions.get('window');
export const HomeScreen = () => {
  const headerHeight = useHeaderHeight();
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
