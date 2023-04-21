import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, View} from 'react-native';
import {AlbumCardImage, AlbumCardName} from './AlbumCard.styles';
import RouteName from '../Util/RouteName';
import Emitter from '../Util/eventEmitter';

export const AlbumCard: React.FC<{
  imageUrl?: string;
  name?: string;
  time?: string;
  isBookMarked?: boolean;
  data?: any;
}> = props => {
  const {imageUrl, name, data} = props;
  const {navigate} = useNavigation();
  const navigateToAlbumScreen = () => {
    if (data?.thumbnail) {
      Emitter.emit('stop_audio');
      navigate(RouteName?.VIDEO_PLAYER, {data: data, isSkip: true});
    } else {
      navigate(RouteName.ALBUM, {
        data: data,
        albumId: 86,
        albumName: 'Calm',
      });
    }
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
        <AlbumCardName>{name}</AlbumCardName>
      </Pressable>
    </View>
  );
};
