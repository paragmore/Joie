import React from 'react';
import {View} from 'react-native';
import {AlbumCard} from './AlbumCard';
import {AlbumCardListContainer, AlbumListHeader} from './AlbumCardList.styles';
import {firstImage, secondImage} from '../Util';

export const AlbumCardsList: React.FC<{
  header?: string;
  data?: any;
}> = props => {
  const {header, data} = props;

  const DATA = [
    {
      name: 'Calm',
      time: '3:10',
      isBookMarked: false,
      imageUrl: firstImage,
    },
    {
      name: 'Calm',
      time: '3:10',
      isBookMarked: false,
      imageUrl: secondImage,
    },
  ];
  return (
    <View>
      <AlbumListHeader>{header}</AlbumListHeader>
      <AlbumCardListContainer
        bounces={false}
        data={data || DATA}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}: any) => (
          <AlbumCard
            name={item?.name || item?.video_name}
            time="3:10"
            isBookMarked={false}
            imageUrl={
              item?.image_url || (index % 2 === 0 ? firstImage : secondImage)
            }
            data={item}
            key={index}
          />
        )}
        keyExtractor={(item: any, index: number) => index}
      />
    </View>
  );
};
