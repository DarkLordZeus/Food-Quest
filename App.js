import {Text, StyleSheet, View, ImageBackground, StatusBar} from 'react-native';
import React, {Component, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import HomeStackNavigator from './Src/NavigatorsScreens/HomeStackNavigator';
import Profile from './Src/Screens/Profile';
import ProfileNavigator from './Src/NavigatorsScreens/DesCartRouteNavigator';
import Description from './Src/Screens/Description';
import DesCartRouteNavigator from './Src/NavigatorsScreens/DesCartRouteNavigator';
import { Provider } from 'react-redux';
import store from './Src/Redux/reduxstore';
import SearchScreens from './Src/Screens/SearchScreens';
import Delivery from './Src/Screens/Delivery';

const Stack = createStackNavigator();
function App() {
  useEffect(() => {
    example();
  }, []);

  //navigationtab color change
  const example = () => {
    try {
      const response = changeNavigationBarColor('#000000');
      console.log('changedcolor'); // {success: true}
    } catch (e) {
      console.log(e); // {success: false}
    }
  };

  return (
    <Provider store={store}>
    <NavigationContainer>
      <StatusBar animated={true} backgroundColor="#000000" />
      <Stack.Navigator>
         
        <Stack.Screen
          name="HomeStackNavigator"
          component={HomeStackNavigator}
          options={{header: () => null}}
        />
        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{header:()=>null}}
               
            />
        <Stack.Screen
          name="Description"
          component={Description}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="SearchScreens"
          component={SearchScreens}
          options={{header: () => null}}
        />
        <Stack.Screen
          name="Delivery"
          component={Delivery}
          options={{header:()=>null}}>

        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default App;
