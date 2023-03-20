import React, {PropsWithChildren, useEffect} from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import {Dimensions, Image, View} from 'react-native';
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

  useEffect(() => {
    console.log(backgroundImageUrl);
  }, [backgroundImageUrl]);

  return (
    <View>
      <View style={{marginTop: 100, zIndex:1}}>{props.children}</View>
      {backgroundVideoUrl && (
        <BackgroundVideo
          source={{
            uri: backgroundVideoUrl,
          }}
          height={headerHeight + height + 35}
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
          height={headerHeight + height + 35}
          source={backgroundImageUrl}
        />
      )}
    </View>
  );
};
