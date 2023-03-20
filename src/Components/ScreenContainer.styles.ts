import {Image} from 'react-native';
import Video from 'react-native-video';
import styled from 'styled-components/native';

export const BackgroundImage = styled<{height: string; width: string}>(Image)`
  height: ${props => props.height};
  width: ${props => props.width};
  position: absolute;
  top: 0;
  left: 0;
  align-items: stretch;
  bottom: 0;
  right: 0;
`;

export const BackgroundVideo = styled<{height: number}>(Video)`
  height: ${props => props.height};
  position: absolute;
  top: 0;
  left: 0;
  align-items: stretch;
  bottom: 0;
  right: 0;
`;
