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
import DogPost from '../../components/DogPost';
import MyModal from '../../components/MyModal';

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

const FindMyDogScreen = ({ navigation }) => {
  const MISSING_DOG_KEY = '@missing_dog_key';
  const [DATA, setDATA] = useState('');
  const [refreshing, setRefreshing] = useState(true);

  // useEffect(async () => {
  //   var loadedData = await getData(MISSING_DOG_KEY);
  //   setDATA(loadedData)
  //   setRefreshing(false)
  // }, []);

  useEffect(async () => {
    //console.log(navigation);
    const unsubscribe = navigation.addListener('focus', () => {
      onRefresh();
      //console.log('tuuu');
    });

    return unsubscribe;
  }, [navigation]);

  const onRefresh = async () => {
    var loadedData = await getData(MISSING_DOG_KEY);
    //console.log(loadedData);
    setDATA(loadedData);
    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.title}>Missing pets in your neighbourhood</Text>
        }
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
              })
            }
          >
            <DogPost
              title={item.title}
              description={item.description}
              image={{ uri: item.imageUri }}
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
  );
};

export default FindMyDogScreen;

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
    title: 'Dalmaty??czyk o imieniu Damian',
    content: 'Zgubi?? si?? podczas ostatniego spaceru',
    imgSrc: {
      uri: 'https://i.kinja-img.com/gawker-media/image/upload/c_scale,f_auto,fl_progressive,pg_1,q_80,w_800/etw5ahwcfttkqikxbfg3.jpg',
    },
    latitude: 54.539,
    longitude: 18.473,
  },
  {
    id: '2',
    title: 'Bardzo du??y pies',
    content: 'NIGDZIE SIE NIE ZGUBI??',
  },
  {
    id: '3',
    title: '??wiatowy Dzie?? Komara',
    content:
      'W przeprowadzanych przez Lasy Pa??stwowe badaniach opinii publicznej niech???? do k??uj??cych nas owad??w deklaruje a?? co trzeci badany.',
  },
  {
    id: '4',
    title: 'Rze??bi?? ???Ducha lasu???',
    content:
      'W poniedzia??ek, mimo deszczowej pogody, rozpocz???? si?? plener artystyczny pod has??em ???Duch lasu???, wsp????organizowany przez Nadle??nictwo Dukla i Gminny O??rodek Kultury w Iwoniczu Zdroju.',
  },
  {
    id: '5',
    title: '??wiatowy Dzie?? Komara',
    content:
      'W przeprowadzanych przez Lasy Pa??stwowe badaniach opinii publicznej niech???? do k??uj??cych nas owad??w deklaruje a?? co trzeci badany.',
  },
  {
    id: '6',
    title: 'Rze??bi?? ???Ducha lasu???',
    content:
      'W poniedzia??ek, mimo deszczowej pogody, rozpocz???? si?? plener artystyczny pod has??em ???Duch lasu???, wsp????organizowany przez Nadle??nictwo Dukla i Gminny O??rodek Kultury w Iwoniczu Zdroju.',
  },
];
