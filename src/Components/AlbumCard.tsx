import React from 'react';
import {Image, View} from 'react-native';
import { AlbumCardImage } from './AlbumCard.styles';

export const AlbumCard: React.FC<{
  imageUrl: string;
  name: string;
  time: string;
  isBookMarked: boolean;
}> = props => {
  const {imageUrl} = props;
  return (
    <View style={{paddingLeft: 20}}>
      <AlbumCardImage source={{uri: imageUrl}} />
    </View>
  );
};
