import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AddScreen from './screens/AddScreen';
import FindMyDogScreen from './screens/FindMyDogScreen';
import SettingScreen from './screens/SettingsScreen';
import HomeScreen from './screens/HomeScreen';
import MarketScreen from './screens/MarketScreen';

const homeScreen = 'Home';
const findMyDogScreen = 'Find My Dog';
const settingsScreen = 'Settings';
const addScreen = 'Add';
const marketScreen = 'Market';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeScreen}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let routeName = route.name;

            if (routeName === homeScreen) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (routeName === findMyDogScreen) {
              iconName = focused ? 'earth' : 'earth-outline';
            } else if (routeName === addScreen) {
              iconName = focused ? 'add' : 'add-outline';
            } else if (routeName === marketScreen) {
              iconName = focused ? 'ios-cart' : 'ios-cart-outline';
            } else if (routeName === settingsScreen) {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={findMyDogScreen} component={FindMyDogScreen} />
        <Tab.Screen name={addScreen} component={AddScreen} />
        <Tab.Screen name={homeScreen} component={HomeScreen} />
        <Tab.Screen name={marketScreen} component={MarketScreen} />
        <Tab.Screen name={settingsScreen} component={SettingScreen} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  someText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});
