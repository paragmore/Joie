import {View, Text, Modal} from 'react-native';
import React, {FC} from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';

interface Props {
  setModalVisible?: any;
  modalVisible?: any;
}
const VideoPlayerSwiper: FC<Props> = ({setModalVisible, modalVisible}) => {
  return (
    <GestureRecognizer
      style={{flex: 1}}
      onSwipeUp={() => setModalVisible(true)}
      onSwipeDown={() => setModalVisible(false)}>
      <Modal
        animationType="slide"
        presentationStyle="formSheet"
        visible={modalVisible}>
        <Text>Swipe Down Please</Text>
      </Modal>
      <Text>Swipe Up Please</Text>
    </GestureRecognizer>
  );
};

export default VideoPlayerSwiper;
