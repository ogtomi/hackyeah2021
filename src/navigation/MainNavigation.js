import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AddScreen from './screens/AddScreen';
import HomeScreen from './screens/HomeScreen';
import MarketScreen from './screens/MarketScreen';
<<<<<<< HEAD
import LostDogInfoScreenNavigator from "./CustomNavigation"
import ProfileScreen from './screens/ProfileScreen';
=======
import LostDogInfoScreenNavigator from './CustomNavigation';
import MarkerScreenNavigator from './MarketNavigation';
>>>>>>> 9a7db6150f7c34db8c8c90c7c26d8c25d9f22bb8

const homeScreen = 'Home';
const findMyDogScreen = 'Find My Dog';
const profileScreen = 'My profile';
const addScreen = 'Add';
const marketScreen = 'Market';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
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
        <Tab.Screen name={addScreen} component={AddScreen} />
        <Tab.Screen name={homeScreen} component={HomeScreen} />
<<<<<<< HEAD
        <Tab.Screen name={marketScreen} component={MarketScreen} />
        <Tab.Screen name={profileScreen} component={ProfileScreen} />
        
=======
        <Tab.Screen name={marketScreen} component={MarkerScreenNavigator} />
        <Tab.Screen name={settingsScreen} component={SettingScreen} />
>>>>>>> 9a7db6150f7c34db8c8c90c7c26d8c25d9f22bb8
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
