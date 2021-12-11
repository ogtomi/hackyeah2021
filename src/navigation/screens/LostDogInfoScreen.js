import React from 'react';
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

const LostDogInfoScreen = ({ route, navigation }) => {
  const { title, description, imgURL, phoneNumber, longitude, latitude } =
    route.params;
  return (
    <ImageBackground
      source={imageSource}
      style={styles.backgroundImage}
      resizeMode="cover"
      imageStyle={{ opacity: 0.3 }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.topButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.postView}>
          <Text style={styles.title}>{title}</Text>
          <View>
            <Text style={styles.contentText}>{description}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.staticText}>Contact number:</Text>
            <Text style={styles.numberText}>{phoneNumber}</Text>
          </View>
        </View>
        <Image style={styles.dogImage} source={{ uri: imgURL }} />
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
    marginLeft: 10,
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    alignSelf: 'center',
    //fontWeight: 'bold',
  },
  postView: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  staticText: {
    fontSize: 16,
    alignItems: 'center',
    textDecorationLine: 'underline',
  },
  contentText: {
    marginTop: 20,
    fontSize: 20,
    marginBottom: 20,
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
  backgroundImage: {
    flex: 1,
    height: '100%',
    width: '100%',
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
    marginTop: 10,
    marginBottom: 10,
  },
  topButtonText: {
    color: 'black',
    fontSize: 20,
  },
});
