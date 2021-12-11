import React from 'react';
import MyModal from '../../components/MyModal';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const MarketPostDetailsScreen = ({ route, navigation }) => {
  const { title, description, category, imageUri } = route.params;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('MarketScreen')}>
        <Text style={styles.backText}>Go back</Text>
      </TouchableOpacity>
      <View style={styles.postView}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.contentText}>
          <Text>{description}</Text>
          <Text>{category}</Text>
        </View>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </View>
    </View>
  );
};

export default MarketPostDetailsScreen;

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
