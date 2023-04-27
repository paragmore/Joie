import React from 'react';
import {View} from 'react-native';
import {AlbumCard} from './AlbumCard';
import {AlbumCardListContainer, AlbumListHeader} from './AlbumCardList.styles';
import {firstImage, secondImage} from '../Util';

export const AlbumCardsList: React.FC<{
  header?: string;
  data?: any;
  container?: any;
  isVideo?: any;
  setSubscription?: any;
  userData?: any;
}> = props => {
  const {header, data, container, isVideo, setSubscription, userData} = props;

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
    <View style={[container]}>
      <AlbumListHeader>{isVideo ? data?.name : ''}</AlbumListHeader>
      <AlbumCardListContainer
        bounces={false}
        data={isVideo ? data?.data : data || DATA}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}: any) => (
          <AlbumCard
            name={isVideo ? item?.video_name : item?.name}
            time="3:10"
            isVideo={isVideo}
            isBookMarked={false}
            userData={userData}
            index={index}
            imageUrl={
              item?.image_url || (index % 2 === 0 ? firstImage : secondImage)
            }
            data={item}
            key={index}
            setSubscription={()=>setSubscription()}
          />
        )}
        keyExtractor={(item: any, index: number) => index}
      />
    </View>
  );
};
