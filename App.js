import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import MainNavigation from './src/navigation/MainNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './src/components/CredentialsContext';
import { ImageBackground, StyleSheet } from 'react-native';

const imageSource = require('./src/images/background.jpg')

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState('');

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('@register_key')
      .then(result => {
        if (result !== null) {
          setStoredCredentials(JSON.stringify(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch(error => console.log(error));
  };

  // if (!appReady) {
  //   return (
  //     <AppLoading
  //       startAsync={checkLoginCredentials}
  //       onFinish={() => setAppReady(false)}
  //       onError={console.warn}
  //     />
  //   );
  // }
  return (
    <ImageBackground source={imageSource} style={styles.backgroundImage} resizeMode='cover'>
      <CredentialsContext.Provider value={{ storedCredentials }}>
        <MainNavigation />
      </CredentialsContext.Provider>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%',
  }
})
