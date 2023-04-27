/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, Animated} from 'react-native';
import {style} from './MediaPlayerOverlay.styles';
import PlayerWidget from './PlayerWidget';
import Colors from '../Util/Colors';
import {Audio} from 'expo-av';
import Emitter from '../Util/eventEmitter';
import {useSelector} from 'react-redux';

export const MediaPlayerOverlay = () => {
  const [Loaded, SetLoaded] = React.useState(false);
  const [Loading, SetLoading] = React.useState(false);
  const sound = React.useRef(new Audio.Sound());
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const audioData = useSelector(state => state?.player?.audioData);
  const N = 20;

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
    LoadAudio();
    Emitter.on('playAudioData', () => {
      loadAudioFile();
    });
    return () => {
      Emitter.off('playAudioData');
      // Unload();
    };
  }, []);

  const loadAudioFile = async () => {
    if (sound?.current) {
      try {
        if (audioData.audio_url) {
          await sound?.current?.unloadAsync();
          LoadAudio();
        }
      } catch (err) {
        console.log('err>>>', err);
      }
    }
    Emitter.on('stop_audio', async () => {
      if (sound?.current) {
        await sound?.current?.pauseAsync();
      }
    });
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

  const LoadAudio = async () => {
    if (audioData?.audio_url) {
      SetLoading(true);

      // await sound?.current?.unloadAsync();
      const checkLoading = await sound.current.getStatusAsync();
      if (checkLoading.isLoaded === false) {
        try {
          const result = await sound.current.loadAsync(
            {
              uri: audioData?.audio_url,
            },
            {},
            true,
          );
          if (result.isLoaded === false) {
            SetLoading(false);
            console.log('Error in Loading Audio');
          } else {
            await sound.current.playAsync();
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
    }
  };

  return (
    <View style={style.container}>
      <View style={style.subContainer}>
        <View style={{width: '80%'}}>
          <Text style={style.textStyle}>{audioData.audio_name}</Text>
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
