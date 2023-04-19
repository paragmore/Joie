import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {FC} from 'react';
import {ImageContainer} from '../Authentication/Authentication.styles';
import Colors from '../Util/Colors';

const {width, height} = Dimensions.get('screen');
interface Props {
  container?: any;
  image?: any;
  style?: any;
  text?: string;
  textStyle?: any;
  subContainer?: any;
  onPress?: any;
}

const CustomButton: FC<Props> = ({
  container,
  image,
  text,
  textStyle,
  subContainer,
  onPress,
}) => {
  return (
    <TouchableOpacity style={[style.container, container]} onPress={onPress}>
      {image ? (
        <View style={[style.subContainer, subContainer]}>
          <ImageContainer
            width={'18px'}
            height={'18px'}
            resizeMode={'contain'}
            source={image}
          />
          <Text style={[style.textStyle, textStyle]}>{text}</Text>
        </View>
      ) : (
        <Text style={[style.textStyle, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const style = StyleSheet.create({
  container: {
    width: '80%',
    height: height > 700 ? height * 0.06 : height * 0.08,
    marginHorizontal: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BLACK[200],
    borderRadius: 12,
  },
  subContainer: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStyle: {
    color: Colors.WHITE[100],
    width: '70%',
    fontSize: 14,
  },
});
