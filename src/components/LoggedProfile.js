import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_KEY, IS_LOGGED_KEY } from '../utils';

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export default function LoggedProfile({ loginData, onRefresh }) {
  const onClickFunction = () => {
    Keyboard.dismiss();
    //console.log(loginData);
  };

  return (
    <TouchableOpacity
      onPress={onClickFunction}
      style={styles.container}
      activeOpacity={1.0}
    >
      <Text style={styles.titleText}> Your Profile Info</Text>

      <Text style={styles.labelText}>Name</Text>
      <Text style={styles.inputText}>{loginData.name}</Text>
      <Text style={styles.labelText}>Surname</Text>
      <Text style={styles.inputText}>{loginData.surname}</Text>
      <Text style={styles.labelText}>Email</Text>
      <Text style={styles.inputText}>{loginData.email}</Text>
      <View style={styles.topButtonView}>
        <TouchableOpacity
          style={styles.topButton}
          onPress={async () => {
            await storeData(IS_LOGGED_KEY, { isLogged: false });
            onRefresh();
          }}
        >
          <Text style={styles.topButtonText}>{'Log Out'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    //alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 30,
  },

  topButtonView: {
    width: '90%',
    alignSelf: 'center',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  topButton: {
    backgroundColor: '#ffd6d6',
    borderRadius: 5,
    //borderWidth: 1,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  topButtonText: {
    color: 'black',
    fontSize: 20,
    alignSelf: 'center',
  },
  labelText: {
    color: 'black',
    textAlign: 'left',
    fontSize: 24,
    paddingLeft: 15,
  },
  titleText: {
    fontSize: 30,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },

  inputText: {
    width: '100%',
    //backgroundColor: 'rgb(255, 0, 0)',
    //borderRadius: 25,
    //height: 50,
    fontSize: 18,
    textAlign: 'left',
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'black',
    backgroundColor: '#ebebeb',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    width: '90%',
    backgroundColor: '#c79200',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
});
