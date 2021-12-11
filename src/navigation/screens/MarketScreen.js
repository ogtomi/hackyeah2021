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
import { TOYS_ADD_KEY, FOOD_ADD_KEY, CLOTHES_ADD_KEY } from '../../utils';

const ALL_KEYS = [TOYS_ADD_KEY, FOOD_ADD_KEY, CLOTHES_ADD_KEY, '@service_key'];

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

const getAllData = async keys => {
  try {
    var DATA = [];
    for (var key of keys) {
      var jsonValue = await AsyncStorage.getItem(key);
      jsonValue = JSON.parse(jsonValue);
      if (jsonValue != null) {
        for (var elem of jsonValue) {
          if (elem != null) {
            var lastId = DATA.length;
            elem.id = lastId;

            DATA.push(elem);
          }
        }
      }
    }

    return DATA;
  } catch (e) {
    console.log(e);
  }
};

const searchAndGetData = async word => {
  var allData = await getAllData(ALL_KEYS);

  var DATA = [];
  word = word.toLowerCase();
  for (var elem of allData) {
    if (elem != null) {
      var title = elem.title;
      title = title.toLowerCase();
      title = title.split(' ');
      for (var singleWord of title) {
        //console.log(singleWord);
        if (singleWord == word) {
          DATA.push(elem);
          break;
        }
      }
    }
  }

  return DATA;
};

const MarketScreen = ({ route, navigation }) => {
  const { category, header, word } = route.params;
  const ADD_KEY = category;
  const [DATA, setDATA] = useState('');
  const [refreshing, setRefreshing] = useState(true);

  useEffect(async () => {
    if (category == 'ALL') {
      var loadedData = await searchAndGetData(word);
    } else {
      var loadedData = await getData(ADD_KEY);
    }
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
        ListHeaderComponent={
          <View style={styles.topButtonView}>
            <TouchableOpacity
              style={styles.topButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.topButtonText}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.header}>{header}</Text>
          </View>
        }
        style={styles.container}
        data={DATA}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              navigation.navigate('MarkerPostDetailsScreen', {
                title: item.title,
                description: item.description,
                category: item.category,
                imageUri: item.imageUri,
                phoneNumber: item.phoneNumber,
                prise: item.prise,
              });
            }}
          >
            <MarketPost
              title={item.title}
              imageUri={item.imageUri}
              prise={item.prise}
            />
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
    marginTop: 15,
  },
  title: {
    color: 'white',
  },
  header: {
    color: 'black',
    //textAlign: 'center',
    fontSize: 30,
    padding: 10,
    left: '100%',
    //alignItems: 'center',
  },
  topButtonView: { flexDirection: 'row', alignItems: 'center' },
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
