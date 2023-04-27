/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useEffect, useState, useRef, FC, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from 'react-native';
import {ScreenContainer} from '../Components/ScreenContainer';
import {AlbumCardsList} from '../Components/AlbumCardsList';
import {ScrollView} from 'react-native';
import {WelcomeText} from '../Components/HomeScreen/HomeScreen.styles';
import {
  getFirebaseAudioData,
  getFirebaseUserData,
  getFirebaseVideoData,
  updateFirebaseUserData,
} from '../Constant/Firebase';
import {Video, ResizeMode} from 'expo-av';
import ButtonImage from '../Components/ButtonImage';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {BACK_ICON, BOTTOM_SWIPE_ICON, PAUSE_ICON, PLAY_ICON} from '../Assets';
import Colors from '../Util/Colors';
import RouteName from '../Util/RouteName';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import HamburgerIcon from '../../assets/hamburger_icon.svg';
import {fontResize} from '../Util/font';
import Emitter from '../Util/eventEmitter';
import CustomSubscriptionsModal from '../Components/CustomSubscriptionsModal';
import {
  isIosStorekit2,
  PurchaseError,
  requestPurchase,
  Sku,
  useIAP,
} from 'react-native-iap';
import {productSkus} from '../Util';
import {useDispatch, useSelector} from 'react-redux';
import {setLoginUserData} from '../Redux/player_slice';

interface Props {
  navigation?: any;
  route?: any;
}

const SWIPE_THRESHOLD = 100;

const {width, height} = Dimensions.get('window');
export const HomeScreen: FC<Props> = ({route}) => {
  const thumbnail =
    route?.params?.data?.thumbnail ||
    'https://firebasestorage.googleapis.com/v0/b/joie-c2494.appspot.com/o/video%2Fthumbnail%2Fwave5.png?alt=media&token=bdf78575-8a2f-4f2d-9570-1b2b47e6da8e';
  const video_url =
    route?.params?.data?.video_url ||
    'https://firebasestorage.googleapis.com/v0/b/joie-c2494.appspot.com/o/video%2Fwave%2FWaves%205.mp4?alt=media&token=636d1b19-575d-4db8-8336-f2a2b6dba857';

  const translateY = useSharedValue(0);
  const top = useSharedValue(height);
  const [videoData, setVideoData] = useState([]);
  const [audioData, setAudioData] = useState([]);
  const [userData, setUserData] = useState<any>({});
  const [viewHeight, setViewHeight] = useState(height);
  const video = useRef<any>(null);
  const [status, setStatus] = useState<any>({});
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userDetails = useSelector((state: any) => state.player?.userData);
  const videoDataList: any = [
    'night sky',
    'mountains',
    'waves',
    'waterfalls',
    'abstract',
  ];

  const {
    connected,
    products,
    currentPurchase,
    currentPurchaseError,
    initConnectionError,
    finishTransaction,
    getProducts,
    subscriptions,
    getSubscriptions,
    requestSubscription,
  } = useIAP();

  useEffect(() => {
    checkVideoDetails();
    handleGetProducts();
  }, []);

  const handleGetProducts = async () => {
    try {
      await getSubscriptions({skus: productSkus});
    } catch (error) {
      console.log('handleGetProducts', error);
    }
  };

  // unload video old video
  async function checkVideoDetails() {
    if (video !== null) {
      await video?.current?.unloadAsync();
      video?.current?.playAsync();
    }
  }

  // Pay  user Subscription
  const payMonthly = async (sku: Sku) => {
    setModalVisible(false);
    try {
      await requestSubscription({sku: sku});
      const updateUserData = await updateFirebaseUserData({
        id: userDetails?.id,
        subscriptions: true,
      });
      var user = userDetails;
      user.subscriptions = true;
      dispatch(setLoginUserData(user));
    } catch (error) {
      console.log('error>>>', error);
    }
  };

  // logout current user
  const logout = async () => {
    await auth().signOut();
    Emitter.emit('logout');
  };

  // call audio and video data get function
  useEffect(() => {
    getAllVideoData();
    getAllAudioData();
  }, []);

  // Fetch all video data firestore
  const getAllVideoData = async () => {
    var videosData: any = await getFirebaseVideoData();
    setVideoData(videosData);
  };

  // Fetch all audio data firestore
  const getAllAudioData = async () => {
    var audiosData: any = await getFirebaseAudioData();
    setAudioData(audiosData);
  };

  // Check firebase AuthStateChanged data
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // get user data
  const onAuthStateChanged = (user: any) => {
    getUserData(user);
  };

  // Fetch firebase store user data
  const getUserData = async (user: any) => {
    const userInfoData: any = await getFirebaseUserData({id: user.uid});
    setUserData(userInfoData._data);
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
        translateY.value = withSpring(-height);
        top.value = 0;
      } else {
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

  const getVideoIndex = useCallback(
    (name: any) => {
      return videoData.findIndex(
        (element: any) => element?.name == name.toLowerCase(),
      );
    },
    [videoData],
  );

  return (
    <>
      {top.value !== 0 && (
        <View style={style.videoViewContainer}>
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
                  <ButtonImage
                    container={{position: 'absolute', top: '5%', left: '5%'}}
                    image={BACK_ICON}
                    onPress={() => {
                      video.current.pauseAsync();
                      navigation.goBack();
                    }}
                  />

                  <View style={style.buttons}>
                    <ButtonImage
                      onPress={() =>
                        status.isPlaying
                          ? video.current.pauseAsync()
                          : video.current.playAsync()
                      }
                      container={style.playButton}
                      image={status.isPlaying ? PAUSE_ICON : PLAY_ICON}
                    />
                  </View>
                  <View style={style.bottomImageView}>
                    <Image
                      resizeMode={'contain'}
                      source={BOTTOM_SWIPE_ICON}
                      style={style.swipeIcon}
                    />
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
      <Animated.View style={[style.animatedViewContainer, topHeightStyle]}>
        <ScreenContainer
          isBackgroundScrollable={true}
          isBackgroundImage={true}
          isScrollView={false}
          isAudio={true}
          backgroundImageUrl={require('./../../assets/home_background.png')}>
          <TouchableOpacity
            style={style.menuButton}
            onPress={() => {
              setDrawer(!drawer);
            }}>
            <HamburgerIcon width={24} height={24} fill="blue" />
          </TouchableOpacity>
          <ScrollView bounces={false}>
            <WelcomeText>
              Welcome, {'\n'}
              {userData?.name}
            </WelcomeText>
            <AlbumCardsList
              userData={userDetails}
              isVideo={false}
              data={audioData}
            />
            {videoDataList.map((item: any) => (
              <AlbumCardsList
                setSubscription={() => {
                  setModalVisible(true);
                }}
                userData={userDetails}
                isVideo={true}
                container={style.container}
                data={videoData[getVideoIndex(item)]}
                header="Recommended collections"
              />
            ))}

            <View style={{height: 150}} />

            {drawer && (
              <View style={style.subContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(RouteName.PRIVACY_POLICY);
                  }}>
                  <Text style={style.textStyle}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    logout();
                  }}>
                  <Text style={style.textStyle}>Logout</Text>
                </TouchableOpacity>
              </View>
            )}
            <CustomSubscriptionsModal
              modalVisible={modalVisible}
              subscriptions={subscriptions}
              setModalVisible={(data: any) => {
                setModalVisible(data);
              }}
              subScriptionButtonPress={(data: any) => {
                payMonthly(data);
              }}
            />
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
  subContainer: {
    top: 5,
    left: 15,
    width: width / 2,
    height: 150,
    position: 'absolute',
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#212121',
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
  textStyle: {
    fontStyle: 'normal',
    fontFamily: 'PlayfairDisplay-Medium',
    color: 'white',
    fontSize: fontResize(18),
    marginTop: 10,
    marginBottom: 15,
    width: '100%',
  },
  swipeIcon: {
    width: 50,
    height: 50,
  },
  bottomImageView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 8,
    marginTop: '10%',
    marginLeft: '5%',
  },
  videoViewContainer: {
    position: 'absolute',
    zIndex: 999,
  },
  animatedViewContainer: {
    flex: 1,
    height: height,
    zIndex: 99,
  },
});
