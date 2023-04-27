import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {FC} from 'react';
import {CROSS_ICON, LOCK_ICON, MODAL_BG} from '../Assets';
import Strings from '../Util/Strings';
import CustomButton from './CustomButton';
import Colors from '../Util/Colors';
import {fontResize} from '../Util/font';
import ButtonImage from './ButtonImage';

const {width, height} = Dimensions.get('screen');

interface Props {
  modalVisible?: any;
  setModalVisible?: any;
  subScriptionButtonPress?: any;
  subscriptions?: any;
}

const CustomSubscriptionsModal: FC<Props> = ({
  modalVisible,
  setModalVisible,
  subScriptionButtonPress,
  subscriptions,
}) => {
  return (
    <Modal
      animated={true}
      animationType={'slide'}
      transparent={true}
      visible={modalVisible}>
      <View style={style.container}>
        <ImageBackground style={style.bgContainer} source={MODAL_BG}>
          <View style={style.subContainer}>
            <Image
              source={LOCK_ICON}
              resizeMode="contain"
              style={style.lockImage}
            />
            <Text style={style.unlockText}>{Strings.UNLOCK}</Text>
            <View style={[style.optionContainer]}>
              <View style={style.roundView} />
              <Text style={style.accessText}>{Strings.UNLIMITED_ACCESS}</Text>
            </View>
            <View style={[style.optionContainer]}>
              <View style={style.roundView} />
              <Text style={style.accessText}>{Strings.NEW_MUSIC}</Text>
            </View>
            <View style={[style.optionContainer]}>
              <View style={style.roundView} />
              <Text style={style.accessText}>{Strings.NEW_VIDEOS}</Text>
            </View>
            <View style={[style.optionContainer]}>
              <View style={style.roundView} />
              <Text style={style.accessText}>{Strings.MORE_FEATURES}</Text>
            </View>

            {subscriptions.map((item: any, index: any) => {
              return (
                <CustomButton
                  container={[
                    style.buttonContainer,
                    index == 0 ? {marginTop: height * 0.05} : {},
                  ]}
                  text={`${Strings.YEARLY_SUBSCIPTIONS}${item?.localizedPrice}${
                    item.subscriptionPeriodUnitIOS == 'YEAR'
                      ? '/year'
                      : '/month'
                  }`}
                  textStyle={style.buttonTextStyle}
                  onPress={() => {
                    setModalVisible(false);
                    subScriptionButtonPress(item?.productId);
                  }}
                />
              );
            })}

            <Text
              style={style.cancelText}
              onPress={() => {
                setModalVisible(false);
              }}>
              {Strings.CANCEL_ANYTIME}
            </Text>
          </View>
          <ButtonImage
            onPress={() => setModalVisible(false)}
            container={style.imageButtonContainer}
            image={CROSS_ICON}
          />
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default CustomSubscriptionsModal;

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.BLACK[100],
  },
  subContainer: {
    width: '80%',
    marginHorizontal: '10%',
    padding: width * 0.05,
    borderRadius: height * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  optionContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: width * 0.04,
    alignItems: 'center',
  },
  roundView: {
    padding: width * 0.02,
    backgroundColor: Colors.WHITE[100],
    marginRight: '10%',
    borderRadius: width * 0.1,
  },
  lockImage: {
    width: width * 0.05,
    height: width * 0.05,
    marginTop: 5,
    marginBottom: width * 0.05,
  },
  bgContainer: {
    width: width,
    height: height * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.1,
    borderTopLeftRadius: width * 0.1,
    borderTopRightRadius: width * 0.1,
    overflow: 'hidden',
  },
  unlockText: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontResize(20),
    lineHeight: fontResize(25),
    color: Colors.WHITE[100],
    marginBottom: height * 0.02,
  },
  accessText: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontResize(12),
    lineHeight: fontResize(15),
    color: Colors.WHITE[100],
    width: '85%',
  },
  buttonContainer: {
    width: '90%',
    backgroundColor: Colors.WHITE[100],
    marginBottom: height * 0.03,
  },
  buttonTextStyle: {
    width: '80%',
    color: Colors.BLACK[100],
    fontFamily: 'Poppins-Medium',
    fontSize: fontResize(14),
    lineHeight: fontResize(20),
    marginHorizontal: '10%',
  },
  cancelText: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontResize(12),
    lineHeight: fontResize(16),
    color: Colors.WHITE[100],
  },
  imageButtonContainer: {
    position: 'absolute',
    top: '5%',
    right: '5%',
  },
});
