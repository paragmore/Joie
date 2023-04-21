import React, {FC} from 'react';
import {AlbumNameText} from '../Components/AlbumScreen/AlbumScreen.styles';
import {MediaItemsList} from '../Components/AlbumScreen/MediaItemsList';
import {MediaPlayerOverlay} from '../Components/MediaPlayerOverlay';
import PlayerWidget from '../Components/PlayerWidget';
import {ScreenContainer} from '../Components/ScreenContainer';
import {View} from 'react-native';
import style from './AlbumScreen.style';
import ButtonImage from '../Components/ButtonImage';
import {BACK_ICON} from '../Assets';

interface Props {
  navigation?: any;
  route?: any;
}

export const AlbumScreen: FC<Props> = ({navigation, route}) => {
  const {itemId, albumName, data} = route.params;

  return (
    <ScreenContainer
      isBackgroundScrollable={false}
      isScrollView={false}
      isAudio={true}
      backgroundImageUrl={
        data?.image_url
          ? {uri: data?.image_url}
          : require('./../../assets/album_background.png')
      }>
      <ButtonImage
        image={BACK_ICON}
        onPress={() => {
          navigation.goBack();
        }}
        container={{position: 'absolute', top: '5%', left: '5%'}}
      />
      <AlbumNameText>{data?.name || albumName}</AlbumNameText>
      <View style={{height: '42%'}}>
        <MediaItemsList data={data?.data} />
      </View>
    </ScreenContainer>
  );
};
