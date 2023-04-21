/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../Components/ScreenContainer';
import { AlbumCardsList } from '../Components/AlbumCardsList';
import { ScrollView } from 'react-native';
import { WelcomeText } from '../Components/HomeScreen/HomeScreen.styles';
import { getFirebaseAudioData, getFirebaseVideoData } from '../Constant/Firebase';
import auth from '@react-native-firebase/auth';
import { Header } from '../Components/Header';
import { HeaderIconContainer } from '../Components/Header.styles';
import HamburgerIcon from '../../assets/hamburger_icon.svg';
import { NavigationContainer } from '@react-navigation/native';
import RouteName from '../Util/RouteName';
import { useNavigation } from '@react-navigation/native';
import Emitter from '../Util/eventEmitter';

const { height, width } = Dimensions.get('screen');
export const HomeScreen = () => {
  const [videoData, setVideoData] = useState([]);
  const [audioData, setAudioData] = useState([]);
  const [userData, setUserData] = useState({});
  const [drawer, setDrawer] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigation = useNavigation();

  const logout = async() => {
    await  auth().signOut();
    Emitter.emit('logout');
  };

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
    setIsSignedIn(true);
  };
 

  return (
    <ScreenContainer
      isBackgroundScrollable={true}
      isScrollView={true}
      isAudio={true}
      backgroundImageUrl={require('./../../assets/home_background.png')}>

      <TouchableOpacity style={{
        width: 60,
        height: 60,
        borderRadius: 50,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent:'center',
        alignItems:'center',
        marginStart:8,
        
      }} onPress={() => {
        setDrawer(!drawer)

      }}>
        <HamburgerIcon width={24} height={24} fill="blue" />
      </TouchableOpacity>

      {/* <Header
        leftIcon={{
          component: (
            <HeaderIconContainer
              onPress={async () => {
                
                setDrawer(!drawer)
              }}>
              <HamburgerIcon width={24} height={24} fill="blue" />


            </HeaderIconContainer>
          ),
          onPress: () => { },
        }}
      /> */}

      <ScrollView bounces={false}>
        <WelcomeText>
          Welcome, {'\n'} {userData?.displayName}
        </WelcomeText>
        <AlbumCardsList data={audioData} />
        {/* <MenuCard /> */}
        <AlbumCardsList data={videoData} header="Recommended collections" />
        <AlbumCardsList data={videoData} header="Mental fitness" />
        <View style={{ height: 150 }} />

        {drawer && <View style={styles.container}>

         
          <TouchableOpacity
             onPress={() => {
              navigation.navigate(RouteName.PRIVACY_POLICY);
             }}>
            <Text style={styles.textStyle}>Privacy Policy</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() =>{
            navigation.navigate(RouteName.TERM_CONDITION);
          }}>
            <Text style={styles.textStyle}>{"Term & Condition"}</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => {
              logout()
            }}>
            <Text style={styles.textStyle}>Logout</Text>
          </TouchableOpacity>

        </View>}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 5,
    left: 15,
    width: width / 4,
    height: 150,
    position: 'absolute',
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#212121'
  },
  textStyle: {
    fontStyle: 'normal',
    color: 'white',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 15
  }
});
