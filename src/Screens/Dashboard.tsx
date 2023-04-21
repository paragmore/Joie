import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {
  DASHBOARD_IMAGE,
  FREEDOM_ICON,
  INSPIRE_ICON,
  PASSION_ICON,
} from '../Assets';
import Strings from '../Util/Strings';
import Colors from '../Util/Colors';
import {fontResize} from '../Util/font';
import CustomButton from '../Components/CustomButton';
import RouteName from '../Util/RouteName';
import {getFirebaseVideoData} from '../Constant/Firebase';

interface Props {
  navigation?: any;
}

const Dashboard: FC<Props> = ({navigation}) => {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    getAllVideoData();
  }, []);
  const getAllVideoData = async () => {
    var videosData: any = await getFirebaseVideoData();
    setVideoData(videosData);
  };
  return (
    <ImageBackground style={style.container} source={DASHBOARD_IMAGE}>
      <Text style={style.titleText}>{Strings.JOIE}</Text>
      <View style={style.bottomContainer}>
        <Text style={style.likeDoStyle}>{Strings.LIKE_TO_DO}</Text>
        <CustomButton
          onPress={() => {
            navigation.navigate(RouteName.VIDEO_PLAYER, {
              data: videoData[0],
              isSkip: false,
            });
          }}
          container={style.buttonContainer}
          image={INSPIRE_ICON}
          text={Strings.INSPIRE}
        />
        <CustomButton
          onPress={() => {
            navigation.navigate(RouteName.VIDEO_PLAYER, {
              data: videoData[1],
              isSkip: false,
            });
          }}
          container={style.buttonContainer}
          image={FREEDOM_ICON}
          text={Strings.FREEDOM}
        />
        <CustomButton
          onPress={() => {
            navigation.navigate(RouteName.VIDEO_PLAYER, {
              data: videoData[2],
              isSkip: false,
            });
          }}
          image={PASSION_ICON}
          text={Strings.PASSION}
        />
      </View>
    </ImageBackground>
  );
};

export default Dashboard;

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  titleText: {
    color: Colors.WHITE[100],
    width: '100%',
    marginTop: '10%',
    textAlign: 'center',
    fontSize: fontResize(40),
  },
  bottomContainer: {
    position: 'absolute',
    bottom: '5%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeDoStyle: {
    fontSize: fontResize(20),
    lineHeight: fontResize(40),
    color: Colors.WHITE[100],
  },
  buttonContainer: {
    marginBottom: '2%',
  },
});
