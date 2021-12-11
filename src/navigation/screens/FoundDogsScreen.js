import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground, RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DogPost from '../../components/DogPost';
import MyModal from '../../components/MyModal';

const imageSource = require('../../images/background.jpg')

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

const FoundDogsScreen = ({ navigation }) => {
  const FOUND_DOG_KEY = '@found_dog_key'
  const [DATA, setDATA] = useState('');
  const [refreshing, setRefreshing] = useState(true);

  useEffect(async () => {
    var loadedData = await getData(FOUND_DOG_KEY);
    setDATA(loadedData)
    setRefreshing(false)
  }, []);

  const onRefresh = async () => {
      var loadedData = await getData(FOUND_DOG_KEY)
      console.log(loadedData)
      setDATA(loadedData)
      setRefreshing(false)
  }
  return (
    <ImageBackground
      source={imageSource}
      style={styles.backgroundImage}
      resizeMode="cover"
      imageStyle={{opacity: 0.3}}
    >
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <Text style={styles.title}>Found dogs in your neighbourhood</Text>
          }
          style={styles.container}
          data={DATA}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                navigation.navigate('FoundDogsInfoScreen', {
                  title: item.title,
                  description: item.description,
                  imgURL: item.imageUri,
                  phoneNumber: item.phoneNumber
                })
             }
            >
              <DogPost
                title={item.title}
                description={item.description}
                image={{ uri: item.imageUri }}
                phoneNumber={item.phoneNumber}
              />
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
    </ImageBackground>
  );
};

export default FoundDogsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

const DATA = [
  {
    id: '1',
    title: 'Dalmatyńczyk o imieniu Damian',
    description: 'Znalazł się cały i zdrowy',
    imgUri: {
      uri: 'https://i.kinja-img.com/gawker-media/image/upload/c_scale,f_auto,fl_progressive,pg_1,q_80,w_800/etw5ahwcfttkqikxbfg3.jpg',
    },
    latitude: 54.539,
    longitude: 18.473,
  },
  {
    id: '2',
    title: 'Bardzo duży pies',
    description: 'NIGDZIE SIE NIE ZGUBIŁ',
  },
  {
    id: '3',
    title: 'Światowy Dzień Komara',
    description:
      'W przeprowadzanych przez Lasy Państwowe badaniach opinii publicznej niechęć do kłujących nas owadów deklaruje aż co trzeci badany.',
  },
  {
    id: '4',
    title: 'Rzeźbią „Ducha lasu”',
    description:
      'W poniedziałek, mimo deszczowej pogody, rozpoczął się plener artystyczny pod hasłem „Duch lasu”, współorganizowany przez Nadleśnictwo Dukla i Gminny Ośrodek Kultury w Iwoniczu Zdroju.',
  },
  {
    id: '5',
    title: 'Światowy Dzień Komara',
    description:
      'W przeprowadzanych przez Lasy Państwowe badaniach opinii publicznej niechęć do kłujących nas owadów deklaruje aż co trzeci badany.',
  },
  {
    id: '6',
    title: 'Rzeźbią „Ducha lasu”',
    description:
      'W poniedziałek, mimo deszczowej pogody, rozpoczął się plener artystyczny pod hasłem „Duch lasu”, współorganizowany przez Nadleśnictwo Dukla i Gminny Ośrodek Kultury w Iwoniczu Zdroju.',
  },
];
