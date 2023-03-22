import React from 'react';
import {AlbumNameText} from '../Components/AlbumScreen/AlbumScreen.styles';
import {MediaItemsList} from '../Components/AlbumScreen/MediaItemsList';
import {MediaPlayerOverlay} from '../Components/MediaPlayerOverlay';
import {ScreenContainer} from '../Components/ScreenContainer';

export const AlbumScreen = ({route, navigation}) => {
  const {itemId, albumName} = route.params;

  return (
    <ScreenContainer
      isBackgroundScrollable={false}
      backgroundImageUrl={require('./../../assets/album_background.png')}>
      <AlbumNameText>{albumName}</AlbumNameText>
      <MediaItemsList />
    </ScreenContainer>
  );
};
