import React from 'react';
import {FlatList} from 'react-native';
import {MediaItemCard} from './MediaItemCard';

export const MediaItemsList = props => {
  const DATA = [
    {
      name: 'Calm',
      id: '1',
      isLiked: true,
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/joie-c2494.appspot.com/o/image%2028.png?alt=media&token=9cd1df9a-0317-46da-a993-471c3b1b0be3',
      subtitle: 'Aron sorkin',
      isPlaying: true,
    },
    {
      name: 'Calm',
      id: '2',
      isLiked: false,
      imageUrl:
        'https://images.pexels.com/photos/1655166/pexels-photo-1655166.jpeg?auto=compress&cs=tinysrgb&w=800',
      subtitle: 'Aron sorkin',
    },
    {
      name: 'Calm',
      id: '3',
      isLiked: true,
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/joie-c2494.appspot.com/o/image%2028.png?alt=media&token=9cd1df9a-0317-46da-a993-471c3b1b0be3',
      subtitle: 'Aron sorkin',
    },
    {
      name: 'Calm',
      id: '4',
      isLiked: false,
      imageUrl:
        'https://images.pexels.com/photos/1655166/pexels-photo-1655166.jpeg?auto=compress&cs=tinysrgb&w=800',
      subtitle: 'Aron sorkin',
    },
    {
      name: 'Calm',
      id: '3',
      isLiked: true,
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/joie-c2494.appspot.com/o/image%2028.png?alt=media&token=9cd1df9a-0317-46da-a993-471c3b1b0be3',
      subtitle: 'Aron sorkin',
    },
    {
      name: 'Calm',
      id: '4',
      isLiked: false,
      imageUrl:
        'https://images.pexels.com/photos/1655166/pexels-photo-1655166.jpeg?auto=compress&cs=tinysrgb&w=800',
      subtitle: 'Aron sorkin',
    },
  ];
  return (
    <FlatList
      data={DATA}
      renderItem={({item}) => (
        <MediaItemCard
          name={item.name}
          isLiked={item.isLiked}
          imageUrl={item.imageUrl}
          key={item.id}
          subtitle={item.subtitle}
          id={item.id}
          isPlaying={item.isPlaying}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
};
