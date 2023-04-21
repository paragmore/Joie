import React, { FC } from "react"
import { View, Text, StyleSheet } from 'react-native';
import WebView from "react-native-webview";
import ButtonImage from "../Components/ButtonImage";
import { BACK_BLACK, BACK_ICON } from '../Assets';
import { useNavigation } from "@react-navigation/native";

const PrivacyPolicy: FC = ({ }) => {
    const navigation = useNavigation();


    return (

        <View style={{ flex: 1, flexDirection: 'column' }}>
            
                <ButtonImage
                    image={BACK_BLACK}
                    onPress={() => {
                        navigation.goBack();
                    }}
                    playIconStyle={{ width: 40, height: 40 ,margin: 10}}
                    container={{ position: 'absolute',zIndex:1 }}
                />
        
            <WebView source={{ uri: 'https://www.lipsum.com/' }} style={{ flex: 1 }} />

        </View>


    )
}


export default PrivacyPolicy