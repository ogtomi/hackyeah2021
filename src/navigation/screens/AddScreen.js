import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  ScrollView,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AddElement from '../../components/AddElement';

const ADD_KEY = '@add_key';
const imageSource = require('../../images/background.jpg');

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

export default function AddScreen() {
  const [firstData, setFirstData] = useState('');
  const [secondData, setSecondData] = useState('');

  const [openAddElement, setOpenAddElement] = useState(false);
  const [scanned, setScanned] = useState(false);

  return (
    <ImageBackground
      source={imageSource}
      style={styles.backgroundImage}
      resizeMode="cover"
      imageStyle={{ opacity: 0.3 }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          //onPress={}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>Add found dog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          //onPress={}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>Add missing dog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOpenAddElement(true);
          }}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>Add new item</Text>
        </TouchableOpacity>
        <TouchableOpacity
          //onPress={}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>Give to shelter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => AsyncStorage.clear()}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>Clear</Text>
        </TouchableOpacity>
        {/* Add Missing dog Modal */}
        <Modal transparent={false} visible={openAddElement}>
          <View style={styles.topButtonView}>
            <TouchableOpacity
              style={styles.topButton}
              onPress={() => setOpenAddElement(false)}
            >
              <Text style={styles.topButtonText}>{'X'}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <AddElement
              closeModal={() => setOpenAddElement(false)}
            ></AddElement>
          </ScrollView>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  topButton: {
    width: 50,
    left: 10,
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
    //marginTop: 40,
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
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
