import React from 'react';
import {AlbumNameText} from '../Components/AlbumScreen/AlbumScreen.styles';
import {ScreenContainer} from '../Components/ScreenContainer';

export const AlbumScreen = ({route, navigation}) => {
  const {itemId, albumName} = route.params;

  return (
    <ScreenContainer
      backgroundImageUrl={require('./../../assets/album_background.png')}>
      <AlbumNameText>{albumName}</AlbumNameText>
    </ScreenContainer>
  );
};
