import React, {useEffect, useState} from 'react';
import {View, Text, Animated} from 'react-native';
import {style} from './MediaPlayerOverlay.styles';
import PlayerWidget from './PlayerWidget';
import Strings from '../Util/Strings';
import Colors from '../Util/Colors';
import {Audio} from 'expo-av';

export const MediaPlayerOverlay = () => {
  const [Loaded, SetLoaded] = React.useState(false);
  const [Loading, SetLoading] = React.useState(false);
  const sound = React.useRef(new Audio.Sound());
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);

  useEffect(() => {
    LoadAudio();
  }, []);

  const getProgress = () => {
    if (sound === null || duration === null || position === null) {
      return 0;
    }

    return (position / duration) * 100;
  };

  const onPlaybackStatusUpdate = (status: any) => {
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

  const formatTime = (millis: any) => {
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
    <View style={style.container}>
      <View style={style.subContainer}>
        <View>
          <Text style={style.textStyle}>{Strings.GOOSBUMPS}</Text>
          <Text style={style.subTextStyle}>{Strings.TRAVIS_SCOTT}</Text>
        </View>
        <PlayerWidget
          Loaded={Loaded}
          Loading={Loading}
          isPlaying={isPlaying}
          PauseAudio={PauseAudio}
          PlayAudio={PlayAudio}
        />
      </View>

      <View style={style.bottomBar}>
        <Animated.View
          style={{
            backgroundColor: Colors.WHITE[100],
            width: `${(position / duration) * 100}%`,
          }}
        />
      </View>
    </View>
  );
};
