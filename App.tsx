/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {ThemeProvider} from 'styled-components/native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/Screens/HomeScreen';
import {DEFAULT_THEME} from './src/Themes/Theme';
import {StatusBar} from 'react-native';
import {AlbumScreen} from './src/Screens/AlbumScreen';
import {LoginScreen} from './src/Screens/LoginScreen';
import {SplashScreen} from './src/Screens/SplashScreen';
import auth from '@react-native-firebase/auth';
import {Provider} from 'react-redux';
import {configureFacebook} from './src/Authentication';
import Dashboard from './src/Screens/Dashboard';
import RouteName from './src/Util/RouteName';
import VideoPlayer from './src/Screens/VideoPlayer';
import Emitter from './src/Util/eventEmitter';
import {MediaPlayerOverlay} from './src/Components/MediaPlayerOverlay';
import PrivacyPolicy from './src/Screens/PrivacyPolicy';
import {
  getFirebaseUserData,
  setFirebaseUserData,
} from './src/Constant/Firebase';
import {withIAPContext} from 'react-native-iap';
import {store} from './src/Redux/store';
import TermsCondition from './src/Screens/TermsCondition';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMediaOverlayVisible, setIsMediaOverlayVisible] = useState(false);

  useEffect(() => {
    Emitter.on('playAudio', () => {
      setIsMediaOverlayVisible(true);
    });
    Emitter.on('stop_audio', async () => {
      setIsMediaOverlayVisible(false);
    });
    Emitter.on('logout', () => {
      setIsSignedIn(false);
    });
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    configureFacebook();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onAuthStateChanged = async (user: any) => {
    if (user) {
      const userExist = await getFirebaseUserData({
        id: user.uid,
      });
      if (userExist !== true) {
        const userStoreData = {
          id: user?.uid,
          email: user?.email,
          image: user?.photoURL,
          name: user?.displayName,
          subscriptions: false,
        };
        const storeFirbaseData = await setFirebaseUserData({
          id: user.uid,
          userData: userStoreData,
        });
      }
      setIsSignedIn(true);
    }
  };

  const getScreens = () => {
    if (isLoading) {
      return (
        <Stack.Screen
          options={{
            header: () => <></>,

            headerBackTitleVisible: false,
          }}
          name={RouteName.SPLASH}
          component={SplashScreen}
        />
      );
    }
    if (!isLoading && !isSignedIn) {
      return (
        <>
          <Stack.Screen
            options={{
              header: () => <></>,
              headerBackTitleVisible: false,
            }}
            name={RouteName.SIGNIN}
            component={LoginScreen}
          />
          <Stack.Screen
            options={{
              headerBackTitleVisible: false,
              headerShown: false,
            }}
            name={RouteName.PRIVACY_POLICY}
            component={PrivacyPolicy}
          />
          <Stack.Screen
            options={{
              headerBackTitleVisible: false,
              headerShown: false,
            }}
            name={RouteName.TERM_CONDITION}
            component={TermsCondition}
          />
        </>
      );
    }
    if (isSignedIn) {
      return (
        <>
          <Stack.Screen
            options={{headerShown: false}}
            name={RouteName.DASHBOARD}
            component={Dashboard}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name={RouteName.VIDEO_PLAYER}
            component={VideoPlayer}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name={RouteName.HOME}
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              headerBackTitleVisible: false,
              headerShown: false,
            }}
            name={RouteName.ALBUM}
            component={AlbumScreen}
          />
          <Stack.Screen
            options={{
              headerBackTitleVisible: false,
              headerShown: false,
            }}
            name={RouteName.PRIVACY_POLICY}
            component={PrivacyPolicy}
          />
          <Stack.Screen
            options={{
              headerBackTitleVisible: false,
              headerShown: false,
            }}
            name={RouteName.TERM_CONDITION}
            component={TermsCondition}
          />
        </>
      );
    }
  };
  return (
    <Provider store={store}>
      <ThemeProvider theme={DEFAULT_THEME}>
        <NavigationContainer>
          <StatusBar hidden />
          <Stack.Navigator
            screenOptions={{
              headerTransparent: true,
              headerShown: true,
            }}
            initialRouteName={RouteName.DASHBOARD}>
            {getScreens()}
          </Stack.Navigator>
          {isMediaOverlayVisible && <MediaPlayerOverlay />}
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default withIAPContext(App);
