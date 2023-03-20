import React from 'react';
import {
  MediaNameSubText,
  MediaNameText,
  MediaPlayerOverlayContainer,
} from './MediaPlayerOverlay.styles';

export const MediaPlayerOverlay = () => {
  return (
    <MediaPlayerOverlayContainer>
      <MediaNameText>Goosbumps</MediaNameText>
      <MediaNameSubText>Travis Scott</MediaNameSubText>
    </MediaPlayerOverlayContainer>
  );
};
