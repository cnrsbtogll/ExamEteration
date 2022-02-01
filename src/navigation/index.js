import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import AddScreen from '../screens/AddScreen';
import routes from './routes';

const RootStackScreen = () => {
  const RootStack = createStackNavigator();

  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={routes.HOME_SCREEN}
        component={HomeScreen}
        options={{
          title: 'Simpsonlar',
        }}
      />
      <RootStack.Screen
        name={routes.DETAIL_SCREEN}
        component={DetailScreen}
        options={{
          title: 'Details',
        }}
      />

      <RootStack.Screen
        name={routes.ADD_SCREEN}
        component={AddScreen}
        options={{
          title: 'Add New Character',
        }}
      />
    </RootStack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};
