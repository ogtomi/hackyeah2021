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
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoggedProfile from '../../components/LoggedProfile';
import { LOGIN_KEY, IS_LOGGED_KEY } from '../../utils';

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

const imageSource = require('../../images/background.jpg');

const ProfileScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onClickFunction = () => {
    Keyboard.dismiss();
  };

  const [loginData, setLoginData] = useState('');

  useEffect(async () => {
    var loadedData = await getData(LOGIN_KEY);
    var isLogged = await getData(IS_LOGGED_KEY);

    if (loadedData != null && isLogged != null) {
      if (isLogged.isLogged) {
        setIsLoggedIn(true);
        //setLoginData(loadedData);
      }
    }
    //console.log(loadedData);
  }, []);

  useEffect(async () => {
    const unsubscribe = navigation.addListener('focus', () => {
      onRefresh();
      console.log(loginData.name);
    });

    return unsubscribe;
  }, [navigation]);

  const onRefresh = async () => {
    var loadedData = await getData(LOGIN_KEY);
    var isLogged = await getData(IS_LOGGED_KEY);
    if (loadedData != null && isLogged != null) {
      if (isLogged.isLogged) {
        setIsLoggedIn(true);
        setLoginData(loadedData);
      } else {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };
  return (
    <ImageBackground
      source={imageSource}
      style={styles.backgroundImage}
      resizeMode="cover"
      imageStyle={{ opacity: 0.3 }}
    >
      {!isLoggedIn && (
        <View style={styles.outerView}>
          <View style={styles.container}>
            <Text style={styles.title}>Sign in</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen', {})}
              styl
              style={styles.category1}
            >
              <Text style={styles.categoryText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen', {})}
              style={styles.category2}
            >
              <Text style={styles.categoryText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {isLoggedIn && (
        <View style={styles.outerView}>
          <LoggedProfile
            loginData={loginData}
            onRefresh={() => onRefresh()}
          ></LoggedProfile>
        </View>
      )}
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  icon: {
    color: 'black',
  },
  backgroundImage: {
    //flex: 1,
    height: '100%',
    width: '100%',
  },
  outerView: {
    flex: 1,
    //backgroundColor: "#fff",
    //alignItems: 'center',
    //justifyContent: 'center',
    //marginTop: 30,
  },
  title: {
    fontSize: 35,
    color: 'black',
    textAlign: 'center',
  },
  bgImage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    //alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 40,
  },
  category1: {
    width: '100%',
    padding: 15,
    //height: 50,
    //alignItems: 'center',
    backgroundColor: '#fcfce1',
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,

    flexDirection: 'row',
  },

  category2: {
    width: '100%',
    padding: 15,
    //height: 50,
    alignItems: 'center',
    backgroundColor: '#e1fcfa',
    //justifyContent: 'center',
    marginTop: 15,
    flexDirection: 'row',
  },
  category3: {
    width: '100%',
    padding: 15,
    //height: 50,
    alignItems: 'center',
    backgroundColor: '#f4e1fc',
    //justifyContent: 'center',
    marginTop: 15,

    flexDirection: 'row',
  },
  categoryText: {
    color: 'black',
    fontSize: 20,
    padding: 10,
  },
});
