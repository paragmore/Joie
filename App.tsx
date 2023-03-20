import React from 'react';
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

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <ThemeProvider theme={DEFAULT_THEME}>
      <NavigationContainer>
        <StatusBar hidden />

        <Stack.Navigator
          screenOptions={{headerTransparent: true, headerShown: true}}
          initialRouteName="Home">
          <Stack.Screen
            options={{
              headerTitle: () => <Header />,
              headerRight: () => (
                <HeaderIconContainer>
                  <SearchIcon width={24} height={24} fill="blue" />
                </HeaderIconContainer>
              ),
              headerLeft: () => {
                return (
                  <HeaderIconContainer>
                    <HamburgerIcon width={24} height={24} fill="blue" />
                  </HeaderIconContainer>
                );
              },
            }}
            name="Home"
            component={HomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
