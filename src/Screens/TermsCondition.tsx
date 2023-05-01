import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import ButtonImage from '../Components/ButtonImage';
import {BACK_BLACK} from '../Assets';
import {useNavigation} from '@react-navigation/native';
import Colors from '../Util/Colors';

const TermsCondition: FC = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <ButtonImage
        image={BACK_BLACK}
        onPress={() => {
          navigation.goBack();
        }}
        playIconStyle={{width: 40, height: 40, margin: 10}}
        container={{
          position: 'absolute',
          zIndex: 1,
          backgroundColor: Colors.WHITE[100],
        }}
      />

      <WebView
        source={{uri: 'https://thejoie.life/terms-of-use'}}
        style={{flex: 1}}
      />
    </View>
  );
};

export default TermsCondition;
