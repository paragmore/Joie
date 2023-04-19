import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {PAUSE_ICON, PLAY_ICON} from '../Assets';
import ButtonImage from './ButtonImage';

const PlayerWidget = ({
  Loaded,
  Loading,
  isPlaying,
  PlayAudio,
  PauseAudio,
}: any) => {
  return (
    <View style={styles.container}>
      {/* <Text>
        {formatTime(position)} / {formatTime(duration)}
      </Text> */}
      <View style={styles.AudioPLayer}>
        {Loading ? (
          <ActivityIndicator size={'small'} color={'red'} />
        ) : (
          <>
            {Loaded === false ? (
              <>
                <ActivityIndicator />
                <Text>Loading Song</Text>
              </>
            ) : (
              <>
                <ButtonImage
                  onPress={() => {
                    if (isPlaying) {
                      PauseAudio();
                    } else {
                      PlayAudio();
                    }
                  }}
                  image={isPlaying ? PAUSE_ICON : PLAY_ICON}
                />
                {/* <TouchableOpacity
                  onPress={() => {
                    if (isPlaying) {
                      PauseAudio();
                    } else {
                      PlayAudio();
                    }
                  }}>
                  <Image
                    resizeMode="contain"
                    style={styles.playIconStyle}
                    source={isPlaying ? PAUSE_ICON : PLAY_ICON}
                  />
                </TouchableOpacity> */}
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  AudioPLayer: {
    width: '100%',
    alignItems: 'center',
  },
  playIconStyle: {
    width: 20,
    height: 20,
  },
});

export default PlayerWidget;
