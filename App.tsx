import React, {useEffect, useState} from 'react';
import {ThemeProvider} from 'styled-components/native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './src/Screens/HomeScreen';
import {DEFAULT_THEME} from './src/Themes/Theme';
import {Text} from 'react-native-svg';
import {Button, StatusBar} from 'react-native';
import {Header} from './src/Components/Header';
import SearchIcon from './assets/search_icon.svg';
import HamburgerIcon from './assets/hamburger_icon.svg';
import {HeaderIconContainer} from './src/Components/Header.styles';
import {AlbumScreen} from './src/Screens/AlbumScreen';
import {LoginScreen} from './src/Screens/LoginScreen';
import {SplashScreen} from './src/Screens/SplashScreen';
import auth from '@react-native-firebase/auth';
import {store} from './store';
import {Provider} from 'react-redux';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onAuthStateChanged = (user: any) => {
    console.log(user);
    if (user) setIsSignedIn(true);
  };

  const getScreens = () => {
    if (isLoading) {
      return (
        <Stack.Screen
          options={{
            // headerTitle: () => <Header />,
            header: () => <></>,

            headerBackTitleVisible: false,
          }}
          name="Splash"
          component={SplashScreen}
        />
      );
    }
    if (!isSignedIn) {
      return (
        <>
          <Stack.Screen
            options={{
              header: () => <></>,
              headerBackTitleVisible: false,
            }}
            name="SignIn"
            component={LoginScreen}
          />
        </>
      );
    }
    if (isSignedIn) {
      return (
        <>
          <Stack.Screen
            options={{
              header: () => (
                <Header
                  leftIcon={{
                    component: (
                      <HeaderIconContainer>
                        <HamburgerIcon width={24} height={24} fill="blue" />
                      </HeaderIconContainer>
                    ),
                    onPress: () => {},
                  }}
                  rightIcon={{
                    component: (
                      <HeaderIconContainer>
                        <SearchIcon width={24} height={24} fill="blue" />
                      </HeaderIconContainer>
                    ),
                    onPress: () => {},
                  }}
                />
              ),
            }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              headerTitle: () => <Header />,
              headerRight: () => (
                <HeaderIconContainer>
                  <SearchIcon width={24} height={24} fill="blue" />
                </HeaderIconContainer>
              ),
              headerBackTitleVisible: false,
            }}
            name="Album"
            component={AlbumScreen}
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
            initialRouteName="Home">
            {getScreens()}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
