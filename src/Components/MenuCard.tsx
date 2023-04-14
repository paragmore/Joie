import React from 'react';
import { MenuCardOuterContainer } from './MenuCard.styles';
import {MenuCardItem} from './MenuCardItem';

export const MenuCard = () => {
    const menuItems = [{title:'Music', icon: <></>}]
  return (
    <MenuCardOuterContainer>
      <MenuCardItem
        title={'Music'}
        icon={<></>}
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </MenuCardOuterContainer>
  );
};
