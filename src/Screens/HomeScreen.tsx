/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef, FC} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {ScreenContainer} from '../Components/ScreenContainer';
import {AlbumCardsList} from '../Components/AlbumCardsList';
import {ScrollView} from 'react-native';
import {WelcomeText} from '../Components/HomeScreen/HomeScreen.styles';
import {getFirebaseAudioData, getFirebaseVideoData} from '../Constant/Firebase';
import auth from '@react-native-firebase/auth';
import {Video, ResizeMode} from 'expo-av';
import ButtonImage from '../Components/ButtonImage';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  BACK_ICON,
  LEFT_ICON,
  PAUSE_ICON,
  PLAY_ICON,
  RIGHT_ICON,
} from '../Assets';
import Colors from '../Util/Colors';
import Strings from '../Util/Strings';
import RouteName from '../Util/RouteName';

interface Props {
  navigation?: any;
  route?: any;
}

const SWIPE_THRESHOLD = 100;

const {width, height} = Dimensions.get('window');
export const HomeScreen: FC<Props> = ({navigation, route}) => {
  const thumbnail =
    route?.params?.data?.thumbnail ||
    'https://firebasestorage.googleapis.com/v0/b/joie-c2494.appspot.com/o/video%2Fthumbnail%2Fwave5.png?alt=media&token=bdf78575-8a2f-4f2d-9570-1b2b47e6da8e';
  const video_url =
    route?.params?.data?.video_url ||
    'https://firebasestorage.googleapis.com/v0/b/joie-c2494.appspot.com/o/video%2Fwave%2FWaves%205.mp4?alt=media&token=636d1b19-575d-4db8-8336-f2a2b6dba857';

  const translateY = useSharedValue(0);
  const top = useSharedValue(height);
  const [videoThumbnail, setVideoThumbnail] = useState('');
  const [video_urlData, setVideo_urlData] = useState('');
  const [videoData, setVideoData] = useState([]);
  const [audioData, setAudioData] = useState([]);
  const [userData, setUserData] = useState({});
  const [viewHeight, setViewHeight] = useState(height);
  const video = useRef<any>(null);
  const [status, setStatus] = useState<any>({});
  const [loaded, setLoaded] = useState(false);
  const [showView, setShowView] = useState(true);

  useEffect(async () => {
    // top.value = height;
    if (video !== null) {
      await video?.current?.unloadAsync();
      video?.current?.playAsync();
    }
  }, []);

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

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({translationY}) => {
      translateY.value = translationY;
      if (top.value < height || top.value > 0) {
        top.value = height - Math.abs(translationY);
      }
    },
    onEnd: ({translationY, velocityY}) => {
      if (translationY < -SWIPE_THRESHOLD || velocityY < -500) {
        console.log('translationY>>', translationY);
        translateY.value = withSpring(-height);
        top.value = 0;
        //  setTimeout(()=>{
        //   if (showView){
        //     setShowView(false)
        //   }
        //  }, 100)

        // if (translationY == -500 ) {
        //   video?.current?.pauseAsync();
        //   // setViewHeight(-height);
        // }
      } else {
        console.log('translationY>>123', translationY);
        translateY.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });
  const topHeightStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: top.value}],
    };
  });
  console.log('top value', top.value);

  return (
    <>
      {top.value !== 0 && (
        <View style={{position: 'absolute', zIndex: 999}}>
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View style={[{flex: 1}, animatedStyle]}>
              <View style={{height: viewHeight}}>
                <ImageBackground
                  style={{width: width, height: viewHeight}}
                  source={{uri: thumbnail}}>
                  <Video
                    ref={video}
                    style={style.video}
                    source={{
                      uri: video_url,
                    }}
                    useNativeControls={false}
                    resizeMode={ResizeMode.STRETCH}
                    isLooping
                    onPlaybackStatusUpdate={status => {
                      setStatus(() => status);
                      if (status.isLoaded) {
                        if (loaded) {
                          // video.current.playAsync();
                          setLoaded(false);
                        }
                      } else {
                        if (!loaded) {
                          video.current.playAsync();
                          setLoaded(true);
                        }
                      }
                    }}
                  />
                  {/* {route?.params?.isSkip ? (
                  <ButtonImage
                    image={BACK_ICON}
                    onPress={() => {
                      video.current.pauseAsync();
                      navigation.goBack();
                    }}
                    container={{position: 'absolute', top: '5%', left: '5%'}}
                  />
                ) : (
                  <View style={styles.headerContainer}>
                    <ButtonImage
                      image={BACK_ICON}
                      onPress={() => {
                        video.current.pauseAsync();
                        navigation.goBack();
                      }}
                    />
                    <Text
                      onPress={() => {
                        video.current.pauseAsync();
                        navigation.reset({
                          index: 0,
                          routes: [{name: RouteName.HOME}],
                        });
                      }}
                      style={styles.textColor}>
                      {Strings.SKIP}
                    </Text>
                  </View>
                )} */}

                  <View style={style.buttons}>
                    {/* <ButtonImage image={LEFT_ICON} disabled={true} /> */}
                    <ButtonImage
                      onPress={() =>
                        status.isPlaying
                          ? video.current.pauseAsync()
                          : video.current.playAsync()
                      }
                      container={style.playButton}
                      image={status.isPlaying ? PAUSE_ICON : PLAY_ICON}
                    />
                    {/* <ButtonImage image={RIGHT_ICON} disabled={true} /> */}
                  </View>
                  <Modal
                    animated={true}
                    animationType={'fade'}
                    transparent={true}
                    visible={loaded}>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <ActivityIndicator size="large" color={'red'} />
                    </View>
                  </Modal>
                </ImageBackground>
              </View>
              <View style={{backgroundColor: 'gray', flex: 1}} />
            </Animated.View>
          </PanGestureHandler>
        </View>
      )}

      {/* Bottom View */}
      <Animated.View
        style={[{flex: 1, height: height, zIndex: 99}, topHeightStyle]}>
        <ScreenContainer
          isBackgroundScrollable={true}
          isScrollView={false}
          isAudio={true}
          backgroundImageUrl={require('./../../assets/home_background.png')}>
          <ScrollView bounces={false}>
            <WelcomeText>
              Welcome, {'\n'} {userData?.displayName}
            </WelcomeText>
            <AlbumCardsList data={audioData} />
            <AlbumCardsList
              container={style.container}
              data={videoData}
              header="Recommended collections"
            />
            <AlbumCardsList
              container={style.container}
              data={videoData}
              header="Mental fitness"
            />
            <View style={{height: 150}} />
          </ScrollView>
        </ScreenContainer>
      </Animated.View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  video: {
    width: width,
    height: '100%',
  },
  buttons: {
    width: '60%',
    position: 'absolute',
    bottom: '10%',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '20%',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.WHITE[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    width: '80%',
    position: 'absolute',
    top: '10%',
    marginHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textColor: {
    color: Colors.WHITE[100],
  },
});
