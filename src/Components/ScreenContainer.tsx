import React, {PropsWithChildren, useEffect, useState} from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import {Dimensions, Image, ScrollView, View} from 'react-native';
import Video from 'react-native-video';
import {BackgroundImage, BackgroundVideo} from './ScreenContainer.styles';
import {Text} from 'react-native-svg';
import {MediaPlayerOverlay} from './MediaPlayerOverlay';

export const ScreenContainer: React.FC<
  PropsWithChildren<{
    isBackgroundScrollable: boolean;
    backgroundImageUrl?: string;
    backgroundVideoUrl?: string;
  }>
> = props => {
  const {backgroundImageUrl, backgroundVideoUrl, isBackgroundScrollable} =
    props;
  const {height, width} = Dimensions.get('window');

  const [isMediaOverlayVisible, setIsMediaOverlayVisible] = useState(false)
  const headerHeight = useHeaderHeight();
  const backgroundHeight = headerHeight + height + 35 + 'px';
  const backgroundWidth = width + 'px';
  useEffect(() => {
    console.log(backgroundHeight);
  }, [backgroundHeight]);

  const getInnerContents = () => {
    return (
      <>
        <ScrollView style={{marginTop: 100, zIndex: 1}}>
          {props.children}
        </ScrollView>
        {backgroundVideoUrl && (
          <BackgroundVideo
            source={{
              uri: backgroundVideoUrl,
            }}
            height={backgroundHeight}
            muted={true}
            repeat={true}
            resizeMode={'cover'}
            rate={1.0}
            ignoreSilentSwitch={'obey'}
          />
        )}
        {backgroundImageUrl && (
          <BackgroundImage
            width={backgroundWidth}
            height={backgroundHeight}
            source={backgroundImageUrl}
          />
        )}
      </>
    );
  };

  return (
    <>
      {isBackgroundScrollable ? (
        <ScrollView style={{backgroundColor: 'black'}}>
          {getInnerContents()}
        </ScrollView>
      ) : (
        <View style={{backgroundColor: 'black'}}>{getInnerContents()}</View>
      )}

      {isMediaOverlayVisible && <MediaPlayerOverlay />}
    </>
  );
};
