import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Video, ResizeMode} from 'expo-av';
import {useState, useRef} from 'react';
import ButtonImage from '../Components/ButtonImage';
import {LEFT_ICON, PAUSE_ICON, PLAY_ICON, RIGHT_ICON} from '../Assets';
import Colors from '../Util/Colors';
import Strings from '../Util/Strings';
import RouteName from '../Util/RouteName';

interface Props {
  navigation?: any;
}
const VideoPlayer: FC<Props> = ({navigation}) => {
  const video = useRef<any>(null);
  const [status, setStatus] = useState<any>({});
  return (
    <View>
      
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.headerContainer}>
        <Text
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.textColor}>
          {Strings.BACK}
        </Text>
        <Text
          onPress={() => {
            navigation.navigate(RouteName.HOME);
          }}
          style={styles.textColor}>
          {Strings.SKIP}
        </Text>
      </View>
      <View style={styles.buttons}>
        <ButtonImage image={LEFT_ICON} />
        <ButtonImage
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
          container={styles.playButton}
          image={status.isPlaying ? PAUSE_ICON : PLAY_ICON}
        />
        <ButtonImage image={RIGHT_ICON} />
      </View>
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
  buttons: {
    width: '60%',
    position: 'absolute',
    bottom: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
