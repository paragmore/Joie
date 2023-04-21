import {Image} from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

export const MediaItemCardImage = styled<{isPlaying: boolean}>(FastImage)`
  border-radius: 20px;
  width: 70px;
  height: 70px;

  border: ${props => (props.isPlaying ? '4px solid #ffebef' : 'none')};
  border-radius: 20px;
`;

export const MediaName = styled.Text`
  /* font-family: 'Inter'; */
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;

  color: #ffffff;
`;

export const MediaSubtitle = styled.Text`
  /* font-family: 'Inter'; */
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  color: #888888;
`;

export const MediaItemCardOuterContainer = styled.Pressable`
  display: flex;
  flex-direction: row;
  /* width: 100%; */
  /* justify-content: center; */
  gap: 10px;
  align-items: center;
  padding: 10px;
`;
