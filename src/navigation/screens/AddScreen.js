import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async value => {
  try {
    await AsyncStorage.setItem('@storage_Key', value);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key');
    console.log(value);
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

// const storeData = async value => {
//   try {
//     const jsonValue = JSON.stringify(value);
//     await AsyncStorage.setItem('@storage_Key', jsonValue);
//   } catch (e) {
//     // saving error
//   }
// };

export default function App() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          storeData('TEEEST');
        }}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Zapisz</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => getData()} style={styles.loginBtn}>
        <Text style={styles.loginText}>Czytaj</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    resizeMode: 'stretch',
  },
  buttonView: {
    marginTop: 50,
    marginBottom: 10,
    //width: Dimensions.get("window").width,
    marginLeft: 5,
    marginRight: 5,
    height: 60,
    backgroundColor: 'rgb(0, 80, 35)',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonViewText: {
    fontSize: 45,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'rgb(0, 80, 35)',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#ffff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'rgb(0, 80, 35)',
  },
  loginBtn: {
    width: 220,
    backgroundColor: 'rgb(0, 80, 35)',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});
