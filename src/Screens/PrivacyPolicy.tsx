import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import ButtonImage from '../Components/ButtonImage';
import {BACK_BLACK, BACK_ICON} from '../Assets';
import {useNavigation} from '@react-navigation/native';
import Colors from '../Util/Colors';

const PrivacyPolicy: FC = ({}) => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
      <ButtonImage
        image={BACK_BLACK}
        onPress={() => {
          navigation.goBack();
        }}
        playIconStyle={{width: 40, height: 40, margin: 10}}
        container={{
          position: 'absolute',
          zIndex: 1,
          backgroundColor: '#D3D3D3',
          borderRadius: 50,
          marginLeft: 7,
          marginTop: 10,
          top: '5%',
        }}
      />

      <WebView
      showsVerticalScrollIndicator={false}
        source={{uri: 'http://122.187.19.218/joie/privacy-policy.html'}}
        style={{flex: 1, marginTop: '25%', marginHorizontal: 10}}
      />
    </View>
  );
};

export default PrivacyPolicy;
