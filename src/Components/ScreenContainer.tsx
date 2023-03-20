import React, {PropsWithChildren, useEffect} from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import {Dimensions, Image, ScrollView, View} from 'react-native';
import Video from 'react-native-video';
import {BackgroundImage, BackgroundVideo} from './ScreenContainer.styles';
import {Text} from 'react-native-svg';

export const ScreenContainer: React.FC<
  PropsWithChildren<{
    backgroundImageUrl?: string;
    backgroundVideoUrl?: string;
  }>
> = props => {
  const {backgroundImageUrl, backgroundVideoUrl} = props;
  const {height, width} = Dimensions.get('window');
  const headerHeight = useHeaderHeight();
  const backgroundHeight = headerHeight + height + 35 + 'px';
  const backgroundWidth = width + 'px';
  useEffect(() => {
    console.log(backgroundHeight);
  }, [backgroundHeight]);

  return (
    <View>
      <ScrollView style={{marginTop: 100, zIndex: 1}}>{props.children}</ScrollView>
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
      {props.children}

      <Text>{backgroundImageUrl}</Text>
      {backgroundImageUrl && (
        <BackgroundImage
          width={backgroundWidth}
          height={backgroundHeight}
          source={backgroundImageUrl}
        />
      )}
    </View>
  );
};
