import React, {PropsWithChildren, useEffect, useState} from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import {Dimensions, Image, ScrollView, View} from 'react-native';
import Video from 'react-native-video';
import {BackgroundImage, BackgroundVideo} from './ScreenContainer.styles';
import {Text} from 'react-native-svg';
import {MediaPlayerOverlay} from './MediaPlayerOverlay';
import Emitter from '../Util/eventEmitter';

export const ScreenContainer: React.FC<
  PropsWithChildren<{
    isBackgroundScrollable: boolean;
    backgroundImageUrl?: string;
    backgroundVideoUrl?: string;
    isScrollView?: boolean;
    isAudio?: boolean;
  }>
> = props => {
  const {
    backgroundImageUrl,
    backgroundVideoUrl,
    isBackgroundScrollable,
    isScrollView = false,
    isAudio = false,
  } = props;
  const {height, width} = Dimensions.get('window');

  const [isMediaOverlayVisible, setIsMediaOverlayVisible] = useState(false);
  const headerHeight = useHeaderHeight();
  const backgroundHeight = headerHeight + height + 35 + 'px';
  const backgroundWidth = width + 'px';
  

  const getInnerContents = () => {
    return (
      <>
        {isScrollView ? (
          <ScrollView
            bounces={false}
            style={{marginTop: height * 0.1, zIndex: 1}}>
            {props.children}
          </ScrollView>
        ) : (
          <View style={{zIndex: 1}}>{props.children}</View>
        )}

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
        <ScrollView bounces={false} style={{backgroundColor: 'black'}}>
          {getInnerContents()}
        </ScrollView>
      ) : (
        <View style={{backgroundColor: 'black'}}>{getInnerContents()}</View>
      )}

      {/* {isAudio && isMediaOverlayVisible && <MediaPlayerOverlay />} */}
    </>
  );
};
