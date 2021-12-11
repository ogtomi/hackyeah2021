import React, { useEffect, useState } from 'react';
import MyModal from '../../components/MyModal';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import MapModule from '../../components/MapModule';

const imageSource = require('../../images/background.jpg');

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
  const { title, descirption, imgURL, phoneNumber } = route.params;

  return (
    <ImageBackground
      source={imageSource}
      style={styles.backgroundImage}
      resizeMode="cover"
      imageStyle={{ opacity: 0.3 }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('FoundDogsScreen')}
        >
          <Text style={styles.backText}>Go back</Text>
        </TouchableOpacity>
        <View style={styles.postView}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.contentText}>
            <Text>{descirption}</Text>
          </View>
          <Text>Contact number: {phoneNumber}</Text>
        </View>
        <Image style={styles.dogImage} source={{ uri: imgURL }} />
      </View>
    </ImageBackground>
  );
};

export default FoundDogsInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  backText: {
    marginTop: 20,
    marginLeft: 10,
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  postView: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    marginTop: 20,
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
});
