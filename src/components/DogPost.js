import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import LostDogInfo from '../navigation/screens/LostDogInfoScreen';

const DogsPost = props => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={props.image} style={{ width: '100%', height: 135 }} />

      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.priseText}>{props.description}</Text>
    </TouchableOpacity>
  );
};

export default DogsPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //alignItems: 'center',
    borderRadius: 10,
    //margin: 10,
    padding: 10,
    //minWidth: '70%',
  },
  title: {
    //marginTop: 10,
    fontSize: 20,
  },
  priseText: { color: 'black', fontSize: 15 },

  content: {
    //marginTop: 10,
    fontSize: 10,
  },
});
