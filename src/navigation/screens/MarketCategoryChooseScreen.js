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
import { TOYS_ADD_KEY, FOOD_ADD_KEY, CLOTHES_ADD_KEY } from '../../utils';

const SERVICE_ADD_KEY = '@service_key';
const imageSource = require('../../images/background.jpg');

const MarketCategoryChooseScreen = ({ navigation }) => {
  const [searchWord, setSearchWord] = useState('');
  return (
    <ImageBackground
      source={imageSource}
      style={styles.backgroundImage}
      resizeMode="cover"
      imageStyle={{ opacity: 0.3 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Choose category</Text>

        <TextInput
          style={styles.inputText}
          placeholder="Search..."
          placeholderTextColor="black"
          onChangeText={text => setSearchWord(text)}
          onSubmitEditing={event =>
            navigation.navigate('MarketScreen', {
              category: 'ALL',
              header: 'Search',
              word: searchWord,
            })
          }
          onS
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MarketScreen', {
              category: TOYS_ADD_KEY,
              header: 'Toys',
            })
          }
          style={styles.category1}
        >
          <Ionicons
            style={styles.icon}
            size={50}
            name={'baseball-outline'}
          ></Ionicons>
          <Text style={styles.categoryText}>Toys</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MarketScreen', {
              category: FOOD_ADD_KEY,
              header: 'Food',
            })
          }
          style={styles.category2}
        >
          <Ionicons
            style={styles.icon}
            size={50}
            name={'pizza-outline'}
          ></Ionicons>
          <Text style={styles.categoryText}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MarketScreen', {
              category: CLOTHES_ADD_KEY,
              header: 'Clothes',
            })
          }
          style={styles.category3}
        >
          <Ionicons
            style={styles.icon}
            size={50}
            name={'shirt-outline'}
          ></Ionicons>
          <Text style={styles.categoryText}>Clothes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MarketScreen', {
              category: SERVICE_ADD_KEY,
              header: 'Services',
            })
          }
          style={styles.category1}
        >
          <Ionicons
            style={styles.icon}
            size={50}
            name={'clipboard-outline'}
          ></Ionicons>
          <Text style={styles.categoryText}>Services</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default MarketCategoryChooseScreen;

const styles = StyleSheet.create({
  icon: {
    color: 'black',
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
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  inputText: {
    width: '100%',
    //backgroundColor: 'rgb(255, 0, 0)',
    //borderRadius: 25,
    padding: 10,
    //height: 50,
    //textAlign: 'center',
    //alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  labelText: { color: 'black', textAlign: 'left', fontSize: 20 },
});
