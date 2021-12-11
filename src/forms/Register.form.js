import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';

const ADD_KEY = '@register_key';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Register</Text>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Name..."
          placeholderTextColor="#000000"
          onChangeText={name => setName(name)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Surname..."
          placeholderTextColor="#000000"
          onChangeText={surname => setSurname(surname)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email..."
          placeholderTextColor="#000000"
          onChangeText={email => setEmail(email)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password..."
          placeholderTextColor="#000000"
          onChangeText={password => setPassowrd(password)}
        />
      </View>
      <TouchableOpacity
        onPress={async () => {
          var newData = { name: name, surname: surname, email: email, password: password };
          setIsLoggedIn(true)
          storeData(ADD_KEY, newData);
        }}
        style={styles.loginBtn}
      >
        <Text>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
};

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e)
    // saving error
  }
};

const persistRegister = (credentials, message, status) => {
  AsyncStorage.setItem('@register_key', JSON.stringify(credentials))
  .then(() => {
    handleMessage(message, status)
    setStoredCredentials(credentials)
  })
  .catch((error) => {
    console.log(error)
    handleMessage('Register failed')
  })
}
export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: 220,
    backgroundColor: '#D3D3D3',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    width: 300,
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  mainText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
