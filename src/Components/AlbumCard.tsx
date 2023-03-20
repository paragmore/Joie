import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {AlbumCardImage, AlbumCardName} from './AlbumCard.styles';

export const AlbumCard: React.FC<{
  imageUrl: string;
  name: string;
  time: string;
  isBookMarked: boolean;
}> = props => {
  const {imageUrl, name} = props;
  const {navigate} = useNavigation();
  const navigateToAlbumScreen = () => {
    navigate('Album', {
      albumId: 86,
      albumName: 'Calm',
    });
  };
  return (
    <View style={{paddingLeft: 20}}>
      <Pressable onPress={navigateToAlbumScreen}>
        <AlbumCardImage source={{uri: imageUrl}} />
      </Pressable>
      <AlbumCardName>{name}</AlbumCardName>
    </View>
  );
};
