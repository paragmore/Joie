/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {FC, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Modal,
  ImageBackground,
  Dimensions,
  Platform,
} from 'react-native';
import {Video, ResizeMode} from 'expo-av';
import {useState, useRef} from 'react';
import ButtonImage from '../Components/ButtonImage';
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
// import Video from 'react-native-video';

const {width, height} = Dimensions.get('screen');

interface Props {
  navigation?: any;
  route?: any;
}
const VideoPlayer: FC<Props> = ({navigation, route}) => {
  const {thumbnail, video_name, video_url} = route?.params?.data;
  const video = useRef<any>(null);
  const [status, setStatus] = useState<any>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    if (video !== null) {
      await video?.current?.unloadAsync();
      video.current.playAsync();
    }
  }, []);

  return (
    <ImageBackground
      style={{
        width: width,
        height: Platform.OS === 'ios' ? height : height * 0.9,
      }}
      source={{uri: thumbnail}}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: video_url,
        }}
        shouldPlay
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
      {route?.params?.isSkip ? (
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
      )}

      <View style={styles.buttons}>
        <ButtonImage
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
          container={styles.playButton}
          image={status.isPlaying ? PAUSE_ICON : PLAY_ICON}
        />
      </View>
      <Modal
        animated={true}
        animationType={'fade'}
        transparent={true}
        visible={loaded}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={'red'} />
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
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
