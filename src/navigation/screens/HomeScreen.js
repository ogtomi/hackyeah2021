import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreenMarketPreview from '../../components/HomeScreenMarketPreview';
import HomeScreenFoundDogsPreview from '../../components/HomeScreenFoundDogsPreview';
import HomeScreenLostDogsPreview from '../../components/HomeScreenLostDogsPreview';

const ADD_KEY = '@add_element_key';

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

export default function HomeScreen({ navigation }) {
  const [firstData, setFirstData] = useState('');
  const [secondData, setSecondData] = useState('');

  useEffect(async () => {
    //console.log(navigation);
    const unsubscribe = navigation.addListener('focus', () => {
      //onRefresh();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent items in the Market</Text>
      <HomeScreenMarketPreview
        navigation={navigation}
      ></HomeScreenMarketPreview>
      <Text style={styles.header}>Found pets</Text>
      <HomeScreenFoundDogsPreview
        navigation={navigation}
      ></HomeScreenFoundDogsPreview>
      <Text style={styles.header}>Lost pets</Text>
      <HomeScreenLostDogsPreview
        navigation={navigation}
      ></HomeScreenLostDogsPreview>
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
    //alignItems: 'center',
    //justifyContent: 'center',
    marginTop: 20,
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
  header: {
    padding: 10,

    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    //left: 0,
    //padding: 10,
    //left: '100%',
    //alignItems: 'center',
  },
});
