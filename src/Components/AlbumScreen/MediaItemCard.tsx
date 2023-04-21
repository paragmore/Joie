import React from 'react';
import {View} from 'react-native';
import {
  MediaItemCardImage,
  MediaItemCardOuterContainer,
  MediaName,
  MediaSubtitle,
} from './MediaItemCard.styles';

import ThreeDotsVerticalIcon from './../../../assets/three_dots_vertical_icon.svg';
import Emitter from '../../Util/eventEmitter';

export const MediaItemCard: React.FC<{
  imageUrl?: string;
  name?: string;
  subtitle?: string;
  isLiked?: boolean;
  isPlaying?: any;
  data?: any;
}> = props => {
  const {name, imageUrl, subtitle, isPlaying, data} = props;
  return (
    <MediaItemCardOuterContainer
      onPress={() => {
        Emitter.emit('playAudio', {data: data});
      }}>
      <MediaItemCardImage isPlaying={isPlaying} source={{uri: imageUrl}} />
      <View style={{flex: 1}}>
        <MediaName>{data.audio_name || name}</MediaName>
        <MediaSubtitle>{subtitle || ''}</MediaSubtitle>
      </View>
      {/* {isLiked ? (
        <HeartFilledIcon width={16} height={16} />
      ) : (
        <HeartBorderedIcon width={16} height={16} />
      )} */}
      <ThreeDotsVerticalIcon width={16} height={16} />
    </MediaItemCardOuterContainer>
  );
};
