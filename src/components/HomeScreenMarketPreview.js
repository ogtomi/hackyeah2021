import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Image,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOYS_ADD_KEY, FOOD_ADD_KEY, CLOTHES_ADD_KEY } from '../utils';
import MarketPost from '../components/MarketPost';

const ALL_KEYS = [TOYS_ADD_KEY, FOOD_ADD_KEY, CLOTHES_ADD_KEY];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

const HomeScreenMarketPreview = ({ navigation }) => {
  const [DATA, setDATA] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  //   useEffect(async () => {
  //     //var loadedData = await getData(ADD_KEY);
  //     setDATA(loadedData);
  //     setRefreshing(false);
  //     //console.log(loadedData);
  //   }, []);

  useEffect(async () => {
    //console.log(navigation);
    const unsubscribe = navigation.addListener('focus', () => {
      onRefresh();
      //console.log('tuuu');
    });

    return unsubscribe;
  }, [navigation]);

  const onRefresh = async () => {
    //var loadedData = await getData(ADD_KEY);
    var loadedData = await getAllData(ALL_KEYS);
    setDATA(loadedData);
    //console.log(loadedData);
    //console.log(loadedData);
    setRefreshing(false);
    //console.log(loadedData);
  };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Recent items in the Market</Text> */}
      <FlatList
        horizontal
        // ListHeaderComponent={
        //   <View style={styles.topButtonView}>
        //     <Text style={styles.header}>Recent items in the Market</Text>
        //   </View>
        // }
        style={styles.container}
        data={DATA}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() => {
              console.log(navigation);

              navigation.navigate('MarkerPostDetailsScreen', {
                title: item.title,
                description: item.description,
                category: item.category,
                imageUri: item.imageUri,
                prise: item.prise,
                fromHome: true,
              });
            }}
          >
            <View style={styles.touchable}>
              <MarketPost
                title={item.title}
                imageUri={item.imageUri}
                prise={item.prise}
              />
            </View>
          </TouchableOpacity>
        )}
        // refreshControl={
        //   <RefreshControl
        //     //refresh control used for the Pull to Refresh
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //   />
        // }
        keyExtractor={item => item.id}
      ></FlatList>
    </View>
  );
};

export default HomeScreenMarketPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //minWidth: '100%',
    //marginTop: 15,
    //width: windowWidth / 2,
  },
  touchable: { flex: 1, minWidth: 200, maxWidth: 200, marginRight: 10 },

  title: {
    color: 'white',
  },
  header: {
    padding: 10,

    color: 'black',
    //textAlign: 'left',
    fontSize: 20,
    //left: 0,
    //padding: 10,
    //left: '100%',
    //alignItems: 'center',
  },
  topButtonView: {
    width: windowWidth,
    //flexDirection: 'row',
    //alignItems: 'left',
    //backgroundColor: 'red',
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
    //marginTop: 15,
    //marginBottom: 10,
  },
  topButtonText: {
    color: 'black',
    fontSize: 20,
  },
});
