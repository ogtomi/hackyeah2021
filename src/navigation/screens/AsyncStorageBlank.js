import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ADD_KEY = '@add_key';

// const storeData = async (key, value) => {
//   try {
//     await AsyncStorage.setItem(key, value);
//   } catch (e) {
//     // saving error
//   }
// };

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

// const getData = async key => {
//   try {
//     const value = await AsyncStorage.getItem(key);
//     console.log(value);
//     if (value !== null) {
//       // value previously stored
//     }
//   } catch (e) {
//     // error reading value
//   }
// };

const getData = async key => {
  try {
    var jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue != null) {
      //console.log(JSON.parse(jsonValue));
      return JSON.parse(jsonValue);
    }
    return null;
  } catch (e) {
    // error reading value
  }
};

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

export default function App() {
  const [firstData, setFirstData] = useState('');
  const [secondData, setSecondData] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputText}
        placeholder="First"
        placeholderTextColor="#003f5c"
        onChangeText={text => setFirstData(text)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Second"
        placeholderTextColor="#003f5c"
        onChangeText={text => setSecondData(text)}
      />
      <TouchableOpacity
        onPress={async () => {
          var newData = { first: firstData, second: secondData };
          appendData(ADD_KEY, newData);
        }}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Zapisz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          var data = await getData(ADD_KEY);
          for (var elem of data) {
            console.log(elem);
          }
        }}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Czytaj</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => AsyncStorage.clear()}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Clear</Text>
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
