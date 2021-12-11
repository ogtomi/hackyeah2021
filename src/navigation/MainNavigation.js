import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AddScreen from './screens/AddScreen';
import HomeScreen from './screens/HomeScreen';
import MarketScreen from './screens/MarketScreen';
import ProfileScreen from './screens/ProfileScreen';
import LostDogInfoScreenNavigator from './CustomNavigation';
import MarkerScreenNavigator from './MarketNavigation';
import LostFoundDogNavigation from './LostFoundDogNavigation';
import { CredentialsContext } from '../components/CredentialsContext';

const homeScreen = 'Home';
const findMyDogScreen = 'Lost Dogs';
const profileScreen = 'My profile';
const addScreen = 'Add';
const marketScreen = 'Market';
const foundDogScreen = 'Found dogs';

const Tab = createBottomTabNavigator();
const imageSource = require('../images/background.jpg');

const MainNavigation = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={homeScreen}
            screenOptions={({ route }) => ({
              headerShown: false,
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
                } else if (routeName === profileScreen) {
                  iconName = focused ? 'person' : 'person-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen
              name={findMyDogScreen}
              component={LostDogInfoScreenNavigator}
            />
            <Tab.Screen
              name={foundDogScreen}
              component={LostFoundDogNavigation}
            />
            <Tab.Screen name={addScreen} component={AddScreen} />
            <Tab.Screen name={homeScreen} component={HomeScreen} />
            <Tab.Screen name={marketScreen} component={MarkerScreenNavigator} />
            <Tab.Screen name={profileScreen} component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
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
  backgroundImage: {
    flex: 1,
    // height: '100%',
    // width: '100%',
    opacity: 0.1,
  },
});
