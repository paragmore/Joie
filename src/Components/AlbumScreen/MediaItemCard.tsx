import React from 'react';
import {View} from 'react-native';
import {
  MediaItemCardImage,
  MediaItemCardOuterContainer,
  MediaName,
  MediaSubtitle,
} from './MediaItemCard.styles';

import HeartBorderedIcon from './../../../assets/heart_bordered_icon.svg';
import HeartFilledIcon from './../../../assets/heart_filled_icon.svg';
import ThreeDotsVerticalIcon from './../../../assets/three_dots_vertical_icon.svg';

export const MediaItemCard: React.FC<{
  imageUrl: string;
  name: string;
  subtitle: string;
  isLiked: boolean;
  id: string;
  isPlaying: boolean;
}> = props => {
  const {name, imageUrl, subtitle, isLiked, id, isPlaying} = props;
  return (
    <MediaItemCardOuterContainer>
      <MediaItemCardImage isPlaying={isPlaying} source={{uri: imageUrl}} />
      <View style={{flex: 1}}>
        <MediaName>{name}</MediaName>
        <MediaSubtitle>{subtitle}</MediaSubtitle>
      </View>
      {isLiked ? (
        <HeartFilledIcon width={16} height={16} />
      ) : (
        <HeartBorderedIcon width={16} height={16} />
      )}
      <ThreeDotsVerticalIcon width={16} height={16} />
    </MediaItemCardOuterContainer>
  );
};
