import React, { useEffect, useState } from 'react';
import MyModal from '../../components/MyModal';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import MapModule from '../../components/MapModule';
import Ionicons from 'react-native-vector-icons/Ionicons';

const imageSource = require('../../images/background.jpg');
const FAVOURITES_KEY = '@favourites_key';

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

const FoundDogsInfoScreen = ({ route, navigation }) => {
  const { title, description, imgURL, phoneNumber, fromHome } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.topButton}
        onPress={() => {
          if (fromHome) {
            navigation.pop();
            navigation.navigate('Home');
          } else {
            navigation.goBack();
          }
        }}
      >
        <Text style={styles.topButtonText}>{'<'}</Text>
      </TouchableOpacity>

      {imgURL && (
        <Image
          style={{ width: '100%', height: '30%', alignSelf: 'center' }}
          source={{ uri: imgURL }}
        />
      )}
      <View style={styles.postView}>
      <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            onPress={async () => {
              var newData = {
                id: '0',
                title: title,
                description: description,
                imageUri: imgURL,
                phoneNumber: phoneNumber,
                fromHome: fromHome
              }
              appendData(FAVOURITES_KEY, newData);
              Alert.alert('OK', 'Added to favourites')
            }}
          >
            <View style={styles.title}>
              <Ionicons
                style={styles.icon}
                size={20}
                name={'heart-outline'}
              ></Ionicons>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.contentText}>{description}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.staticText}>Contact number:</Text>
          <Text style={styles.numberText}>{phoneNumber}</Text>
        </View>
      </View>
    </View>
  );
};

export default FoundDogsInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  backText: {
    marginLeft: 10,
    fontSize: 18,
  },
  title: {
    paddingTop: 10,
    fontSize: 20,
    paddingLeft: 15,
    backgroundColor: 'white',
    //alignSelf: 'center',
  },
  postView: {
    marginTop: 15,
    marginBottom: 15,
    //padding: 20,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  staticText: {
    fontSize: 16,
    paddingLeft: 15,
    alignItems: 'center',
    textDecorationLine: 'underline',
    backgroundColor: 'white',
  },
  contentText: {
    backgroundColor: 'white',
    alignSelf: 'center',
    //textAlign: 'center',
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 15,
  },
  numberText: {
    fontSize: 18,
    paddingLeft: 20,
    backgroundColor: 'white',
    width: '100%',
  },
  mapModule: {
    height: '35%',
    justifyContent: 'flex-end',
    bottom: 0,
    position: 'absolute',
  },
  dogImage: {
    alignSelf: 'center',
    height: '30%',
    width: '70%',
  },
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%',
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
    marginTop: 10,
    marginBottom: 10,
  },
  topButtonText: {
    color: 'black',
    fontSize: 20,
  },
});
