import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MarketPost from '../../components/MarketPost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITEM_ADD_KEY } from '../../utils';

const ADD_KEY = ITEM_ADD_KEY;

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

const MarketScreen = ({ navigation }) => {
  const [DATA, setDATA] = useState('');
  const [refreshing, setRefreshing] = useState(true);

  useEffect(async () => {
    var loadedData = await getData(ADD_KEY);
    setDATA(loadedData);
    setRefreshing(false);
    //console.log(loadedData);
  }, []);

  const onRefresh = async () => {
    var loadedData = await getData(ADD_KEY);
    setDATA(loadedData);
    setRefreshing(false);
    //console.log(loadedData);
  };
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<Text style={styles.title}>Market Posts</Text>}
        style={styles.container}
        data={DATA}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() =>
              navigation.navigate('MarkerPostDetailsScreen', {
                title: item.title,
                description: item.description,
                category: item.category,
                imageUri: item.imageUri,
              })
            }
          >
            <MarketPost title={item.title} imageUri={item.imageUri} />
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        keyExtractor={item => item.id}
      ></FlatList>
    </View>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
  },
});

// var DATA = [
//   {
//     id: '1',
//     title: 'Dalmatyńczyk o imieniu Damian',
//     content: 'Zgubił się podczas ostatniego spaceru',
//     imgSrc: {
//       uri: 'https://i.kinja-img.com/gawker-media/image/upload/c_scale,f_auto,fl_progressive,pg_1,q_80,w_800/etw5ahwcfttkqikxbfg3.jpg',
//     },
//   },
//   {
//     id: '2',
//     title: 'Bardzo duży pies',
//     content: 'NIGDZIE SIE NIE ZGUBIŁ',
//   },
//   {
//     id: '3',
//     title: 'Światowy Dzień Komara',
//     content:
//       'W przeprowadzanych przez Lasy Państwowe badaniach opinii publicznej niechęć do kłujących nas owadów deklaruje aż co trzeci badany.',
//   },
//   {
//     id: '4',
//     title: 'Rzeźbią „Ducha lasu”',
//     content:
//       'W poniedziałek, mimo deszczowej pogody, rozpoczął się plener artystyczny pod hasłem „Duch lasu”, współorganizowany przez Nadleśnictwo Dukla i Gminny Ośrodek Kultury w Iwoniczu Zdroju.',
//   },
//   {
//     id: '5',
//     title: 'Światowy Dzień Komara',
//     content:
//       'W przeprowadzanych przez Lasy Państwowe badaniach opinii publicznej niechęć do kłujących nas owadów deklaruje aż co trzeci badany.',
//   },
//   {
//     id: '6',
//     title: 'Rzeźbią „Ducha lasu”',
//     content:
//       'W poniedziałek, mimo deszczowej pogody, rozpoczął się plener artystyczny pod hasłem „Duch lasu”, współorganizowany przez Nadleśnictwo Dukla i Gminny Ośrodek Kultury w Iwoniczu Zdroju.',
//   },
// ];
