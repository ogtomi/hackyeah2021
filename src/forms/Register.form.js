import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ADD_KEY = '@register_key';

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

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
          storeData(ADD_KEY, newData);
        }}
        style={styles.loginBtn}
      >
        <Text>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
};

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
