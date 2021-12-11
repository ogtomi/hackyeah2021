import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import LostDogInfo from '../navigation/screens/LostDogInfoScreen';

const MarketPost = props => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      {props.imageUri && (
        <Image
          source={{ uri: props.imageUri }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </TouchableOpacity>
  );
};

export default MarketPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 10,
  },
  content: {
    marginTop: 10,
    fontSize: 10,
  },
});
