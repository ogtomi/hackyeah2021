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

export default function LoginScreen({ navigation }) {
  const [formName, setFormName] = useState('');
  const [formSurname, setFormSurname] = useState('');
  const [formEmail, setFormEmail] = useState('');
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
      <Text style={styles.labelText}>Name</Text>
      <TextInput
        style={styles.inputText}
        placeholder="Jan"
        placeholderTextColor="black"
        onChangeText={text => setFormName(text)}
      />
      <Text style={styles.labelText}>Surname</Text>
      <TextInput
        style={styles.inputText}
        placeholder="Kowalski"
        placeholderTextColor="black"
        onChangeText={text => setFormSurname(text)}
      />
      <Text style={styles.labelText}>Email</Text>
      <TextInput
        style={styles.inputText}
        placeholder="jan.kowalski@gmail.com"
        placeholderTextColor="black"
        onChangeText={text => setFormEmail(text)}
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
          var loginData = {
            name: formName,
            surname: formSurname,
            email: formEmail,
            password: formPassword,
          };
          await storeData(LOGIN_KEY, loginData);
          await storeData(IS_LOGGED_KEY, { isLogged: false });
          Alert.alert('OK', 'Success!');
          navigation.navigate('LoginScreen');
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
