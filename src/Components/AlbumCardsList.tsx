import React from 'react';
import {View} from 'react-native';
import {AlbumCard} from './AlbumCard';
import {AlbumCardListContainer} from './AlbumCardList.styles';

export const AlbumCardsList = () => {
  const DATA = [
    {
      name: 'Calm',
      time: '3:10',
      isBookMarked: false,
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/joie-c2494.appspot.com/o/image%2028.png?alt=media&token=9cd1df9a-0317-46da-a993-471c3b1b0be3',
    },
    {
      name: 'Calm',
      time: '3:10',
      isBookMarked: false,
      imageUrl:
        'https://images.pexels.com/photos/1655166/pexels-photo-1655166.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];
  return (
    <View>
      <AlbumCardListContainer
        data={DATA}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <AlbumCard
            name={item.name}
            time="3:10"
            isBookMarked={false}
            imageUrl={item.imageUrl}
            key={item.id}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
