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
import AddMissingDog from '../../components/AddMissingDog';
import AddFoundDog from '../../components/AddFoundDog';
import AddGiveToShelter from '../../components/AddGivetoShelter';
import AddOfferService from '../../components/AddOfferService';
import { LOGIN_KEY, IS_LOGGED_KEY } from '../../utils';

const ADD_KEY = '@add_key';
const MISSING_DOG_KEY = '@missing_dog_key';
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

export default function AddScreen({ navigation }) {
  const [isLogged, setIsLogged] = useState(false);

  const [openAddElement, setOpenAddElement] = useState(false);
  const [openAddMissingDog, setOpenAddMissingDog] = useState(false);
  const [openAddFoundDog, setOpenAddFoundDog] = useState(false);
  const [openGiveToShelter, setOpenGiveToShelter] = useState(false);
  const [openOfferSerive, setOpenOfferSerive] = useState(false);

  useEffect(async () => {
    //console.log(navigation);
    const unsubscribe = navigation.addListener('focus', () => {
      onRefresh();
    });

    return unsubscribe;
  }, [navigation]);

  const onRefresh = async () => {
    var newData = await getData(IS_LOGGED_KEY);
    if (newData != null && newData.isLogged) {
      setIsLogged(true);
      //console.log(newData);
    } else {
      setIsLogged(false);
    }
  };

  return (
    <ImageBackground
      source={imageSource}
      style={styles.backgroundImage}
      resizeMode="cover"
      imageStyle={{ opacity: 0.3 }}
    >
      {isLogged && (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              setOpenAddFoundDog(true);
            }}
            style={styles.category1}
          >
            <Text style={styles.buttonText}>Found pet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOpenAddMissingDog(true);
            }}
            style={styles.category2}
          >
            <Text style={styles.buttonText}>Missing pet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOpenAddElement(true);
            }}
            style={styles.category3}
          >
            <Text style={styles.buttonText}>New item</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOpenOfferSerive(true);
            }}
            style={styles.category1}
          >
            <Text style={styles.buttonText}>Offer service</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOpenGiveToShelter(true)}
            style={styles.category3}
          >
            <Text style={styles.buttonText}>Give to shelter</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => AsyncStorage.clear()}
            style={styles.category2}
          >
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity> */}

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

          {/* MISSING DOG MODAL */}
          <Modal transparent={false} visible={openAddMissingDog}>
            <View style={styles.topButtonView}>
              <TouchableOpacity
                style={styles.topButton}
                onPress={() => setOpenAddMissingDog(false)}
              >
                <Text style={styles.topButtonText}>{'X'}</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              <AddMissingDog
                closeModal={() => setOpenAddMissingDog(false)}
              ></AddMissingDog>
            </ScrollView>
          </Modal>

          {/* FOUND DOG MODAL */}
          <Modal transparent={false} visible={openAddFoundDog}>
            <View style={styles.topButtonView}>
              <TouchableOpacity
                style={styles.topButton}
                onPress={() => setOpenAddFoundDog(false)}
              >
                <Text style={styles.topButtonText}>{'X'}</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              <AddFoundDog
                closeModal={() => setOpenAddFoundDog(false)}
              ></AddFoundDog>
            </ScrollView>
          </Modal>

          {/* OFFER SERVICE MODAL */}
          <Modal transparent={false} visible={openOfferSerive}>
            <View style={styles.topButtonView}>
              <TouchableOpacity
                style={styles.topButton}
                onPress={() => setOpenOfferSerive(false)}
              >
                <Text style={styles.topButtonText}>{'X'}</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              <AddOfferService
                closeModal={() => setOpenOfferSerive(false)}
              ></AddOfferService>
            </ScrollView>
          </Modal>

          {/* GIVE TO SHELTER MODAL */}
          <Modal transparent={false} visible={openGiveToShelter}>
            <View style={styles.topButtonView}>
              <TouchableOpacity
                style={styles.topButton}
                onPress={() => setOpenGiveToShelter(false)}
              >
                <Text style={styles.topButtonText}>{'X'}</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              <AddGiveToShelter
                closeModal={() => setOpenGiveToShelter(false)}
              ></AddGiveToShelter>
            </ScrollView>
          </Modal>
        </View>
      )}
      {!isLogged && (
        <View style={styles.container}>
          <Text style={styles.title}>You have to be logged in</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen', {})}
            style={styles.category1}
          >
            <Text style={styles.categoryText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Or</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen', {})}
            style={styles.category2}
          >
            <Text style={styles.categoryText}>Register</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  categoryText: {
    color: 'black',
    fontSize: 20,
    padding: 10,
  },
  title: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
  },
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
  category1: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fcfce1',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    flexDirection: 'row',
  },
  category2: {
    width: '100%',
    padding: 15,
    backgroundColor: '#e1fcfa',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    flexDirection: 'row',
  },
  category3: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f4e1fc',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
  },
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
