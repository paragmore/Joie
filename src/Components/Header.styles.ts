import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  position: static;
  width: 100%;
  background-color: transparent;
  top: 10px;
`;

export const HeaderIconContainer = styled.Pressable`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 19px;
  gap: 10px;
  width: 62px;
  height: 62px;
  top: 36px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 38px;
`;
