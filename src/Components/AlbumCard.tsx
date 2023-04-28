import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, View, Image} from 'react-native';
import {AlbumCardImage, AlbumCardName} from './AlbumCard.styles';
import RouteName from '../Util/RouteName';
import Emitter from '../Util/eventEmitter';
import {LOCK_ICON} from '../Assets';

export const AlbumCard: React.FC<{
  imageUrl?: string;
  name?: string;
  time?: string;
  isBookMarked?: boolean;
  data?: any;
  isVideo?: any;
  index?: number;
  setSubscription?: any;
  userData?: any;
}> = props => {
  const {imageUrl, name, data, index, setSubscription, userData} = props;
  const {navigate} = useNavigation();
  const navigateToAlbumScreen = () => {
    if (data?.thumbnail) {
      if (index === 0) {
        playVideo();
      } else {
        if (userData?.subscriptions === true) {
          playVideo();
        } else {
          setSubscription();
        }
      }
    } else {
      navigate(RouteName.ALBUM, {
        data: data,
        albumId: 86,
        albumName: 'Calm',
      });
    }
  };

  const playVideo = () => {
    Emitter.emit('stop_audio', {data: ''});
    navigate(RouteName?.VIDEO_PLAYER, {data: data, isSkip: true});
  };
  return (
    <View style={{paddingLeft: 20}}>
      <Pressable
        style={{overflow: 'hidden', borderRadius: 20}}
        onPress={navigateToAlbumScreen}>
        <AlbumCardImage
          resizeMode="cover"
          source={{uri: data?.thumbnail || imageUrl}}
        />
        {data?.thumbnail && index != 0 && !userData?.subscriptions && (
          <Image
            resizeMode="contain"
            source={LOCK_ICON}
            style={{
              position: 'absolute',
              top: '8%',
              right: '8%',
              width: 30,
              height: 30,
            }}
          />
        )}

        <AlbumCardName>{name}</AlbumCardName>
      </Pressable>
    </View>
  );
};
