import {ImageBackground} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

export const AlbumCardImage = styled(FastImage)`
  border-radius: 40px;
  width: 250px;
  height: 180px;
  /* justify-content: center;
  align-items: center; */
`;

export const AlbumCardName = styled.Text`
  font-family: 'Poppins-Light';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 40px;
  margin-left: 30px;
  margin-top: 10px;
  color: #f0f0f0;
`;
