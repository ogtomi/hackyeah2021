import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

import AddScreen from './screens/AddScreen';
import FindMyDogScreen from './screens/FindMyDogScreen';
import SettingScreen from './screens/SettingsScreen';
import HomeScreen from './screens/HomeScreen';

const homeScreen = 'Home';
const findMyDogScreen = 'Find My Dog';
const settingsScreen = 'Settings';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName={homeScreen}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let routeName = route.name

                    if ( routeName === homeScreen) 
                    {
                        iconName = focused ? 'home' : 'home-outline'
                    } 
                    else if ( routeName === findMyDogScreen) 
                    {
                        iconName = focused ? 'list' : 'list-outline'
                    }
                    else if ( routeName === settingsScreen) 
                    {
                        iconName = focused ? 'settings' : 'settings-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={color} />
                }
            })}
        >
            <Tab.Screen name={findMyDogScreen} component={FindMyDogScreen} />
            <Tab.Screen name={homeScreen} component={HomeScreen} />
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
