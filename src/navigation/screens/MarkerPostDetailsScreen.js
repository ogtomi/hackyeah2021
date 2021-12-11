import React from 'react';
import MyModal from '../../components/MyModal';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NAMES } from '../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

const MarketPostDetailsScreen = ({ route, navigation }) => {
  const {
    title,
    description,
    category,
    phoneNumber,
    imageUri,
    prise,
    fromHome,
  } = route.params;
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
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: '100%', height: '30%', alignSelf: 'center' }}
        />
      )}
      <View style={styles.postView}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity>
            <View style={styles.title}>
              <Ionicons
                style={styles.icon}
                size={20}
                name={'heart-outline'}
              ></Ionicons>
            </View>
          </TouchableOpacity>
        </View>
        {prise == 'free' ? (
          <Text style={styles.prise}>Free</Text>
        ) : (
          <Text style={styles.prise}>{prise} zł</Text>
        )}
        <Text style={styles.contentText}>{description}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.contentText}>Contact number: {phoneNumber}</Text>
        </View>
      </View>
    </View>
  );
};

export default MarketPostDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  backText: {
    marginTop: 20,
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
  prise: {
    fontSize: 16,
    paddingLeft: 15,
    backgroundColor: 'white',
    paddingBottom: 10,
    //borderRadius: 1,
  },
  postView: {
    marginTop: 15,
    marginBottom: 15,
    //padding: 20,
    //alignItems: 'center',
    justifyContent: 'center',
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
  staticText: {
    fontSize: 16,
    alignItems: 'center',
    textDecorationLine: 'underline',
  },
  numberText: {
    fontSize: 18,
    marginLeft: 20,
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
