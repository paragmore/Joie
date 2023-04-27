import React, {FC, useState, useEffect} from 'react';
import {AlbumNameText} from '../Components/AlbumScreen/AlbumScreen.styles';
import {MediaItemsList} from '../Components/AlbumScreen/MediaItemsList';
import {MediaPlayerOverlay} from '../Components/MediaPlayerOverlay';
import PlayerWidget from '../Components/PlayerWidget';
import {ScreenContainer} from '../Components/ScreenContainer';
import {View} from 'react-native';
import style from './AlbumScreen.style';
import ButtonImage from '../Components/ButtonImage';
import {BACK_ICON} from '../Assets';
import CustomSubscriptionsModal from '../Components/CustomSubscriptionsModal';
import {useDispatch, useSelector} from 'react-redux';
import {updateFirebaseUserData} from '../Constant/Firebase';
import {setLoginUserData} from '../redux/player-slice';
import {Sku, useIAP, requestSubscription} from 'react-native-iap';
import { productSkus } from '../Util';

interface Props {
  navigation?: any;
  route?: any;
}

export const AlbumScreen: FC<Props> = ({navigation, route}) => {
  const {itemId, albumName, data} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state: any) => state.player?.userData);

  const {
    connected,
    products,
    currentPurchase,
    currentPurchaseError,
    initConnectionError,
    finishTransaction,
    getProducts,
    subscriptions,
    getSubscriptions,
    requestSubscription,
  } = useIAP();

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleGetProducts = async () => {
    try {
      await getSubscriptions({skus: productSkus});
    } catch (error) {
      console.log('handleGetProducts', error);
    }
  };

  // Pay  user Subscription
  const payMonthly = async (sku: any) => {
    setModalVisible(false);
    try {
      await requestSubscription({sku: sku});
      const updateUserData = await updateFirebaseUserData({
        id: userDetails?.id,
        subscriptions: true,
      });
      var user = userDetails;
      user.subscriptions = true;
      dispatch(setLoginUserData(user));
    } catch (error) {
      console.log('error>>>', error);
    }
  };

  return (
    <ScreenContainer
      isBackgroundScrollable={false}
      isScrollView={false}
      isAudio={true}
      isBackgroundImage={true}
      backgroundImageUrl={
        data?.image_url
          ? {uri: data?.image_url}
          : require('./../../assets/album_background.png')
      }>
      <ButtonImage
        image={BACK_ICON}
        onPress={() => {
          navigation.goBack();
        }}
        container={{position: 'absolute', top: '5%', left: 10}}
      />
      <AlbumNameText style={{paddingLeft: 10}}>
        {data?.name || albumName}
      </AlbumNameText>
      <View style={{height: '42%'}}>
        <MediaItemsList
          data={data?.data}
          userDetails={userDetails}
          getSubscription={() => {
            setModalVisible(true);
          }}
        />
      </View>

      <CustomSubscriptionsModal
        modalVisible={modalVisible}
        subscriptions={subscriptions}
        setModalVisible={(data: any) => {
          setModalVisible(data);
        }}
        subScriptionButtonPress={(data: any) => {
          payMonthly(data);
        }}
      />
    </ScreenContainer>
  );
};
