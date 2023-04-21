import {ImageBackground} from 'react-native';
import styled from 'styled-components/native';

export const AlbumCardImage = styled(ImageBackground)`
  border-radius: 40px;
  width: 250px;
  height: 180px;
  justify-content: center;
  align-items: center;
`;

export const AlbumCardName = styled.Text`
  /* font-family: ''; */
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 40px;

  /* letter-spacing: 0.03em; */
  color: #f0f0f0;
`;
