import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import LostDogInfo from '../navigation/screens/LostDogInfoScreen';

const DogPost = props => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={styles.thumbnailImage}
          source={props.image}
        />
        <View style={styles.textView}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.content}>{props.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DogPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    //alignItems: 'center',
    borderRadius: 0,
    marginRight: 60,
    padding: 5,
  },
  title: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 5,
    fontSize: 10,
  },
  thumbnailImage: {
    width: 50,
    height: 50,
    marginRight: 7,
    marginTop: 5,
  },
  textView: {
  }
});
