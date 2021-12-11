import React from 'react';
import MyModal from '../../components/MyModal';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import MapModule from '../../components/MapModule';

const imageSource = require('../../images/background.jpg');

const LostDogInfoScreen = ({ route, navigation }) => {
  const { title, content, imgURL, longitude, latitude } = route.params;
  return (
    <ImageBackground
      source={imageSource}
      style={styles.backgroundImage}
      resizeMode="cover"
      imageStyle={{ opacity: 0.3 }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('FindMyDogScreen')}
        >
          <Text style={styles.backText}>Go back</Text>
        </TouchableOpacity>
        <View style={styles.postView}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.contentText}>
            <Text>{content}</Text>
          </View>
        </View>
        <Image style={styles.dogImage} source={imgURL} />
        <View style={styles.mapModule}>
          <MapModule longitude={longitude} latitude={latitude} />
        </View>
      </View>
    </ImageBackground>
  );
};

export default LostDogInfoScreen;

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
    fontWeight: 'bold'
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
