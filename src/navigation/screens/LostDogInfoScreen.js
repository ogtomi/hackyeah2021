import React from 'react';
import MyModal from '../../components/MyModal';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MapModule from '../../components/MapModule';

const LostDogInfoScreen = ({ route, navigation }) => {
  const { title, content, imgURL, longitude, latitude } = route.params;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('FindMyDogScreen')}>
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
        <MapModule longitude={longitude} latitude={latitude}/>
      </View>
    </View>
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
    fontSize: 20,
    alignSelf: 'center',
  },
  postView: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    marginTop: 30,
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
});
