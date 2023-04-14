import styled from 'styled-components/native';

export const MenuCardOuterContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

export const MenuCardItemContainer = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 76px;
  height: 59px;

  background: #271a2d;
  border: 0.5px solid rgba(99, 68, 114, 0.3);
  border-radius: 16px;
`;

export const MenuCardItemText = styled.Text`
  /* font-family: 'Poppins'; */
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 15px;
  /* identical to box height */
  color: #ffffff;
  text-transform: capitalize;
`;
