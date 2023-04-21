import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {FC} from 'react';

interface Props {
  container?: any;
  image?: any;
  style?: any;
  playIconStyle?: any;
  onPress?: any;
  disabled?: boolean;
}

const ButtonImage: FC<Props> = ({
  container,
  image,
  onPress,
  playIconStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity style={[container]} onPress={onPress} disabled={disabled}>
      <Image
        resizeMode="contain"
        style={[styles.playIconStyle, playIconStyle]}
        source={image}
      />
    </TouchableOpacity>
  );
};

export default ButtonImage;

const styles = StyleSheet.create({
  playIconStyle: {
    width: 20,
    height: 20,
  },
});
