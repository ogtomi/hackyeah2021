import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DogPost from '../components/DogPost';
import MyModal from '../components/MyModal';

const imageSource = require('../images/background.jpg');

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

const HomeScreenLostDogsPreview = ({ navigation }) => {
  const FOUND_DOG_KEY = '@missing_dog_key';
  const [DATA, setDATA] = useState('');
  const [refreshing, setRefreshing] = useState(true);

  useEffect(async () => {
    var loadedData = await getData(FOUND_DOG_KEY);
    setDATA(loadedData);
    setRefreshing(false);
  }, []);

  const onRefresh = async () => {
    var loadedData = await getData(FOUND_DOG_KEY);
    console.log(loadedData);
    setDATA(loadedData);
    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        // ListHeaderComponent={
        //   <Text style={styles.title}>Found dogs in your neighbourhood</Text>
        // }
        style={styles.container}
        data={DATA}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() =>
              navigation.navigate('LostDogInfoScreen', {
                title: item.title,
                description: item.description,
                imgURL: item.imageUri,
                phoneNumber: item.phoneNumber,
                longitude: item.longitude,
                latitude: item.latitude,
                fromHome: true,
              })
            }
          >
            <View style={styles.touchable}>
              <DogPost
                title={item.title}
                description={item.description}
                image={{ uri: item.imageUri }}
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      ></FlatList>
    </View>
  );
};

export default HomeScreenLostDogsPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchable: { flex: 1, minWidth: 200, maxWidth: 200, marginRight: 10 },
  title: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 22,
    //fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
