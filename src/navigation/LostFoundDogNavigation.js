import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import LostDogInfoScreen from './screens/LostDogInfoScreen';
import FindMyDogScreen from './screens/FindMyDogScreen';
import FoundDogsScreen from './screens/FoundDogsScreen.js';
import FoundDogsInfoScreen from './screens/FoundDogsInfoScreen.js'

const Stack = createStackNavigator();

const LostFoundDogNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FoundDogsScreen" component={FoundDogsScreen} />
      <Stack.Screen name="FoundDogsInfoScreen" component={FoundDogsInfoScreen} />
    </Stack.Navigator>
  );
};

export default LostFoundDogNavigation;
