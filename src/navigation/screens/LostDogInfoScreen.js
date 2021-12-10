import React from 'react';
import MyModal from '../../components/MyModal';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LostDogInfoScreen = ({ route, navigation }) => {
  const { title, content } = route.params;
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
      marginTop: 30,
  }
});
