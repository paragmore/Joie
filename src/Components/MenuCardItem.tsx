import React from 'react';
import {MenuCardItemContainer, MenuCardItemText} from './MenuCard.styles';

export const MenuCardItem: React.FC<{
  title: string;
  icon: any;
  onPress: () => void;
}> = props => {
  const {title, icon, onPress} = props;
  return (
    <MenuCardItemContainer onPress={onPress}>
      {icon}
      <MenuCardItemText>{title}</MenuCardItemText>
    </MenuCardItemContainer>
  );
};
