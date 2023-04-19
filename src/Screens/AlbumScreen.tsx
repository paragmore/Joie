import React from 'react';
import {AlbumNameText} from '../Components/AlbumScreen/AlbumScreen.styles';
import {MediaItemsList} from '../Components/AlbumScreen/MediaItemsList';
import {MediaPlayerOverlay} from '../Components/MediaPlayerOverlay';
import PlayerWidget from '../Components/PlayerWidget';
import {ScreenContainer} from '../Components/ScreenContainer';
import {ImageBackground} from 'react-native';
import style from './AlbumScreen.style';

export const AlbumScreen = ({route, navigation}) => {
  const {itemId, albumName} = route.params;

  return (
    <ImageBackground
      resizeMode="cover"
      style={style.container}
      source={require('./../../assets/album_background.png')}>
      <AlbumNameText>{albumName}</AlbumNameText>
      <MediaItemsList />
    </ImageBackground>
  );
};
