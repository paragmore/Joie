/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenContainer} from '../Components/ScreenContainer';
import {AlbumCardsList} from '../Components/AlbumCardsList';
import {ScrollView} from 'react-native';
import {WelcomeText} from '../Components/HomeScreen/HomeScreen.styles';
import {getFirebaseAudioData, getFirebaseVideoData} from '../Constant/Firebase';
import auth from '@react-native-firebase/auth';

export const HomeScreen = () => {
  const [videoData, setVideoData] = useState([]);
  const [audioData, setAudioData] = useState([]);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    getAllVideoData();
    getAllAudioData();
  }, []);
  const getAllVideoData = async () => {
    var videosData: any = await getFirebaseVideoData();
    setVideoData(videosData);

    // console.log('videoData', videosData);
  };
  const getAllAudioData = async () => {
    var audiosData: any = await getFirebaseAudioData();
    setAudioData(audiosData);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onAuthStateChanged = (user: any) => {
    setUserData(user);
  };
  return (
    <>
      <ScreenContainer
        isBackgroundScrollable={true}
        isScrollView={true}
        isAudio={true}
        backgroundImageUrl={require('./../../assets/home_background.png')}>
        <ScrollView bounces={false}>
          <WelcomeText>
            Welcome, {'\n'} {userData?.displayName}
          </WelcomeText>
          <AlbumCardsList data={audioData} />
          {/* <MenuCard /> */}
          <AlbumCardsList data={videoData} header="Recommended collections" />
          <AlbumCardsList data={videoData} header="Mental fitness" />
          <View style={{height: 150}} />
        </ScrollView>
      </ScreenContainer>
    </>
  );
};
