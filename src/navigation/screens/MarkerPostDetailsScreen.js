import React from 'react';
import MyModal from '../../components/MyModal';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const MarketPostDetailsScreen = ({ route, navigation }) => {
  const { title, description, category, imageUri, prise } = route.params;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.topButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.topButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.postView}>
        <Text style={styles.title}>{title}</Text>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 200, height: 200 }}
          />
        )}
        <View style={styles.contentText}>
          <Text>{description}</Text>
          <Text>{category}</Text>
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
    fontSize: 20,
    padding: 15,
    //alignSelf: 'center',
  },
  postView: {
    marginTop: 30,
    marginBottom: 30,
    //padding: 20,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    alignSelf: 'center',
    padding: 5,
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
