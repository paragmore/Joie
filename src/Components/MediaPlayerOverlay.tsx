import React from 'react';
import {
  MediaNameSubText,
  MediaNameText,
  MediaPlayerOverlayContainer,
} from './MediaPlayerOverlay.styles';
import PlayerWidget from './PlayerWidget';

export const MediaPlayerOverlay = () => {
  return (
    <MediaPlayerOverlayContainer>
      <MediaNameText>Goosbumps</MediaNameText>
      <MediaNameSubText>Travis Scott</MediaNameSubText>
      <PlayerWidget />
    </MediaPlayerOverlayContainer>
  );
};
