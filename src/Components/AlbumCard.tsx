import React from 'react';
import { Image, View } from 'react-native';

export const AlbumCard: React.FC<{
  imageUrl: string;
  name: string;
  time: string;
  isBookMarked: string;
}> = props => {
  return (
    <View>
      <Image />
    </View>
  );
};
