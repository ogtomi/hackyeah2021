import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import MarkerPostDetailsScreen from './screens/MarkerPostDetailsScreen';
import MarketScreen from './screens/MarketScreen';
import MarketCategoryChooseScreen from './screens/MarketCategoryChooseScreen';

const Stack = createStackNavigator();

const MarkerScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="MarketCategoryChooseScreen"
        component={MarketCategoryChooseScreen}
      />
      <Stack.Screen
        name="MarkerPostDetailsScreen"
        component={MarkerPostDetailsScreen}
      />
      <Stack.Screen name="MarketScreen" component={MarketScreen} />
    </Stack.Navigator>
  );
};

export default MarkerScreenNavigator;
