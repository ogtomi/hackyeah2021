import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import LostDogInfo from '../navigation/screens/LostDogInfoScreen';

const MarketPost = props => {
  return (
    <TouchableOpacity style={styles.container}>
      {props.imageUri && (
        <Image
          source={{ uri: props.imageUri }}
          style={{ width: '100%', height: 135 }}
        />
      )}
      <Text style={styles.title}>{props.title}</Text>
      {props.prise == 'free' ? <Text style={styles.prise}>Free</Text> : <Text style={styles.prise}>{props.prise} zł</Text>}
    </TouchableOpacity>
  );
};

export default MarketPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
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
