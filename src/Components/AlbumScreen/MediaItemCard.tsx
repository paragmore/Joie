import React from 'react';
import {View, Image} from 'react-native';
import {
  MediaItemCardImage,
  MediaItemCardOuterContainer,
  MediaName,
  MediaSubtitle,
} from './MediaItemCard.styles';

import ThreeDotsVerticalIcon from './../../../assets/three_dots_vertical_icon.svg';
import Emitter from '../../Util/eventEmitter';
import CommonDataManager from '../CommonDataManager';
import {useDispatch} from 'react-redux';
import {setAudioPlayerData} from '../../Redux/player_slice';
import {LOCK_ICON} from '../../Assets';

export const MediaItemCard: React.FC<{
  imageUrl?: string;
  name?: string;
  subtitle?: string;
  isLiked?: boolean;
  isPlaying?: any;
  data?: any;
  index?: any;
  getSubscription?: any;
  userDetails?: any;
}> = props => {
  const {name, subtitle, data, index, getSubscription, userDetails} = props;
  const dispatch = useDispatch();

  const playAudioMusic = (item: any) => {
    if (index === 0) {
      playAudioFile(item);
    } else {
      if (userDetails.subscriptions) {
        playAudioFile(item);
      } else {
        getSubscription();
      }
    }
  };

  const playAudioFile = (item: any) => {
    Emitter.emit('playAudio', {data: ''});
    Emitter.emit('playAudioData', {data: item});
    var commonData: any = CommonDataManager.getInstance();
    commonData.setAudioPlayer(data);
    dispatch(setAudioPlayerData(item));
  };
  return (
    <MediaItemCardOuterContainer
      onPress={() => {
        playAudioMusic(data);
      }}>
      {/* <MediaItemCardImage isPlaying={isPlaying} source={{uri: imageUrl}} /> */}
      <View style={{flex: 1}}>
        <MediaName>{data.audio_name || name}</MediaName>
        <MediaSubtitle>{subtitle || ''}</MediaSubtitle>
      </View>
      {index != 0 && userDetails.subscriptions && (
        <Image
          source={LOCK_ICON}
          style={{width: 16, height: 16}}
          resizeMode="contain"
        />
      )}

      {/* {isLiked ? (
        <HeartFilledIcon width={16} height={16} />
      ) : (
        <HeartBorderedIcon width={16} height={16} />
      )} */}
      <ThreeDotsVerticalIcon width={16} height={16} />
    </MediaItemCardOuterContainer>
  );
};
