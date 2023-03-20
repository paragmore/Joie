import styled from 'styled-components/native';

export const MediaPlayerOverlayContainer = styled.View`
  background: rgba(253, 253, 255, 0.2);
  /* dropdshadow-down/$dropshadow-z2-down */

  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.12);
  border-radius: 20px;
  position: absolute;
  bottom: 10px;
  width: 100%;
  height: 64px;
`;

export const MediaNameText = styled.Text`
  /* font-family: 'Inter'; */
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  color: #ffffff;
`;

export const MediaNameSubText = styled.Text`
  /* font-family: 'Inter'; */
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  /* identical to box height */

  color: #888888;
`;
