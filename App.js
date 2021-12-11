import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import MainNavigation from './src/navigation/MainNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './src/components/CredentialsContext';

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
    <CredentialsContext.Provider value={{storedCredentials}}>
      <MainNavigation />
    </CredentialsContext.Provider>
  );
}
