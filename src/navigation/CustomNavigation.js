import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import LostDogInfoScreen from './screens/LostDogInfoScreen';
import FindMyDogScreen from './screens/FindMyDogScreen';

const Stack = createStackNavigator();

const LostDogInfoScreenNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
      <Stack.Screen name="FindMyDogScreen" component={FindMyDogScreen} />
      <Stack.Screen name="LostDogInfoScreen" component={LostDogInfoScreen} />
    </Stack.Navigator>
  );
};

export default LostDogInfoScreenNavigator;
