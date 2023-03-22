import * as React from 'react';
import {Text, View, StyleSheet, ActivityIndicator, Button} from 'react-native';
import {Audio} from 'expo-av';
import {useEffect, useState} from 'react';

const PlayerWidget = () => {
  const [Loaded, SetLoaded] = React.useState(false);
  const [Loading, SetLoading] = React.useState(false);
  const sound = React.useRef(new Audio.Sound());
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState<number | null>(null);

  React.useEffect(() => {
    LoadAudio();
  }, []);

  const getProgress = () => {
    if (sound === null || duration === null || position === null) {
      return 0;
    }

    return (position / duration) * 100;
  };

  const onPlaybackStatusUpdate = status => {
    setIsPlaying(status.isPlaying);
    setDuration(status.durationMillis);
    setPosition(status.positionMillis);
  };
  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
        }
      }
    } catch (error) {}
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (sound.current) {
      sound.current.getStatusAsync().then(status => {
        onPlaybackStatusUpdate(status);
      });
      const interval = setInterval(() => {
        sound.current.getStatusAsync().then(status => {
          onPlaybackStatusUpdate(status);
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [sound.current]);

  const formatTime = millis => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const LoadAudio = async () => {
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(
          {
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          },
          {},
          true,
        );
        if (result.isLoaded === false) {
          SetLoading(false);
          console.log('Error in Loading Audio');
        } else {
          SetLoading(false);
          SetLoaded(true);
        }
      } catch (error) {
        console.log(error);
        SetLoading(false);
      }
    } else {
      SetLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>
        {formatTime(position)} / {formatTime(duration)}
      </Text>
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
                <Button title="Play Song" onPress={PlayAudio} />
                <Button title="Pause Song" onPress={PauseAudio} />
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
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  AudioPLayer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
  },
});

export default PlayerWidget;
