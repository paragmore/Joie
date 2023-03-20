import React from 'react';
import {Pressable} from 'react-native';
import {HeaderContainer} from './Header.styles';

export const Header: React.FC<{
  leftIcon?: {component: any; onPress: () => void};
  rightIcon?: {component: any; onPress: () => void};
}> = props => {
  const {leftIcon, rightIcon} = props;
  return (
    <HeaderContainer>
      {leftIcon && (
        <Pressable onPress={leftIcon.onPress}>{leftIcon.component}</Pressable>
      )}
      {rightIcon && (
        <Pressable onPress={rightIcon.onPress}>{rightIcon.component}</Pressable>
      )}
    </HeaderContainer>
  );
};
