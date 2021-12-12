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
import { LOGIN_KEY, IS_LOGGED_KEY } from '../../utils';

const appendData = async (key, value) => {
  try {
    var prevData = await AsyncStorage.getItem(key);
    if (prevData != null) {
      prevData = JSON.parse(prevData);
      prevData.push(value);
      const jsonValue = JSON.stringify(prevData);
      await AsyncStorage.setItem(key, jsonValue);
    } else {
      const jsonValue = JSON.stringify([value]);
      await AsyncStorage.setItem(key, jsonValue);
    }
  } catch (e) {
    // error reading value
  }
};

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export default function RegisterShelterScreen({ navigation }) {
  const [formName, setFormName] = useState('');
  const [formAddress1, setformAddress1] = useState('');
  const [formAddress2, setformAddress2] = useState('');
  const [formPassword, setPassword] = useState('');

  const onClickFunction = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableOpacity
      onPress={onClickFunction}
      style={styles.container}
      activeOpacity={1.0}
    >
      <Text style={styles.titleText}> Sign Up</Text>
      <Text style={styles.labelText}>Shelter Name</Text>
      <TextInput
        style={styles.inputText}
        placeholder="Schronisko 'Promyk'"
        placeholderTextColor="black"
        onChangeText={text => setFormName(text)}
      />
      <Text style={styles.labelText}>Address</Text>
      <TextInput
        multiline
        style={styles.inputTextMulti}
        placeholder="ul. Kocia 1"
        placeholderTextColor="black"
        onChangeText={text => setformAddress1(text)}
      />
      <Text style={styles.labelText}>Contact number</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.inputText}
        placeholder="80-280, Gdańsk"
        placeholderTextColor="black"
        onChangeText={text => setformAddress2(text)}
      />
      <Text style={styles.labelText}>Email</Text>
      <TextInput
        style={styles.inputText}
        placeholder="schronisko@trojmiasto.pl"
        placeholderTextColor="black"
        onChangeText={text => setformAddress2(text)}
      />
      <Text style={styles.labelText}>Password</Text>
      <TextInput
        style={styles.inputText}
        placeholderTextColor="black"
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity
        onPress={async () => {
          Alert.alert(
            'OK',
            'Your request was send! We will write you back after verification :)',
          );
          navigation.navigate('ProfileScreen');
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.topButtonView}>
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.topButtonText}>{'<'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 30,
  },
  topButtonView: { width: '90%' },
  topButton: {
    //backgroundColor: 'rgb(0, 80, 35)',
    borderRadius: 5,
    borderWidth: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  topButtonText: {
    color: 'black',
    fontSize: 20,
  },
  labelText: {
    color: 'black',
    textAlign: 'left',
    fontSize: 20,
  },
  titleText: {
    fontSize: 30,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },

  inputText: {
    width: '90%',
    //backgroundColor: 'rgb(255, 0, 0)',
    //borderRadius: 25,
    //height: 50,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: 'black',
    backgroundColor: '#ebebeb',
    borderRadius: 5,
  },
  inputTextMulti: {
    width: '90%',
    minHeight: 50,
    //backgroundColor: 'rgb(255, 0, 0)',
    //borderRadius: 25,
    //height: 50,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: 'black',
    backgroundColor: '#ebebeb',
    borderRadius: 5,
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
