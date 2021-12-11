import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import MarkerPostDetailsScreen from './screens/MarkerPostDetailsScreen';
import MarketScreen from './screens/MarketScreen';

const Stack = createStackNavigator();

const MarkerScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MarketScreen" component={MarketScreen} />
      <Stack.Screen
        name="MarkerPostDetailsScreen"
        component={MarkerPostDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default MarkerScreenNavigator;
