import React from 'react';
import {Text} from 'react-native';
import {Header} from '../Components/Header';
import SearchIcon from '../../assets/search_icon.svg';
export const HomeScreen = () => {
  return (
    <>
      <Header
        leftIcon={{
          component: <Text>Hi</Text>,
          onPress: () => console.log('left'),
        }}
        rightIcon={{
          component: <Text>Hi</Text>,
          onPress: () => console.log('right'),
        }}
      />
      <SearchIcon width={24} height={24} fill="blue" />
    </>
  );
};
