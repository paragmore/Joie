import React, {FC} from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import ButtonImage from '../Components/ButtonImage';
import {BACK_BLACK} from '../Assets';
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
          backgroundColor: Colors.WHITE[100],
          marginLeft: 7,
          top: '3%',
        }}
      />

      <WebView
        showsVerticalScrollIndicator={false}
        source={{uri: 'https://thejoie.life/privacy-policy'}}
        style={{flex: 1}}
      />
    </View>
  );
};

export default PrivacyPolicy;
