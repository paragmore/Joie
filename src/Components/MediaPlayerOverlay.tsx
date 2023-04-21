/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, Animated} from 'react-native';
import {style} from './MediaPlayerOverlay.styles';
import PlayerWidget from './PlayerWidget';
import Strings from '../Util/Strings';
import Colors from '../Util/Colors';
import {Audio} from 'expo-av';
import Emitter from '../Util/eventEmitter';
import CommonDataManager from './CommonDataManager';

const demoAudio =
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

export const MediaPlayerOverlay = () => {
  const [Loaded, SetLoaded] = React.useState(false);
  const [Loading, SetLoading] = React.useState(false);
  const [name, SetName] = React.useState('');
  const sound = React.useRef(new Audio.Sound());
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);
  const [duration, setDuration] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);

  useEffect(() => {
    // LoadAudio({url: demoAudio});
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
  useEffect(async () => {
    var commenData: any = CommonDataManager.getInstance();
    let audioData = commenData.getAudioPlayer();
    console.log('audioData', audioData);
    SetName(audioData.audio_name);
    if (sound?.current) {
      try {
        await sound?.current?.unloadAsync();
        LoadAudio({url: audioData.audio_url});
      } catch (err) {
        console.log('err>>>', err);
      }
    }
    // Emitter.on('playAudioData', async ({data}: any) => {
    //   var commenData = CommonDataManager.getInstance();
    //   let audioData = commenData.getAudioPlayer();
    //   console.log('audioData', audioData);
    //   SetName(audioData.audio_name);
    //   if (sound?.current) {
    //     try {
    //       await sound?.current?.unloadAsync();
    //       LoadAudio({url: audioData.audio_url});
    //     } catch (err) {
    //       console.log('err>>>', err);
    //     }
    //   }
    // });
    // return () => {
    //   Emitter.off('playAudioData');
    //   // Unload();
    // };
    Emitter.on('stop_audio', async () => {
      if (sound?.current) {
        await sound?.current?.pauseAsync();
      }
    });
  }, []);

  // const Unload = async () => {
  //   await sound?.current?.unloadAsync();
  // };

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

  const LoadAudio = async ({url}) => {
    console.log('url>>>', url);
    SetLoading(true);
    // await sound?.current?.unloadAsync();
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(
          {
            uri: url,
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
  };

  return (
    <View style={style.container}>
      <View style={style.subContainer}>
        <View style={{width: '80%'}}>
          <Text style={style.textStyle}>{name}</Text>
          {/* <Text style={style.subTextStyle}>{Strings.TRAVIS_SCOTT}</Text> */}
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
