import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DogPost from '../../components/DogPost';
import MyModal from '../../components/MyModal';

const FindMyDogScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.title}>Lost dogs in your neighbourhood</Text>
        }
        style={styles.container}
        data={DATA}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() =>
              navigation.navigate('LostDogInfoScreen', {
                title: item.title,
                content: item.content,
                imgURL: item.imgSrc,
                longitude: item.longitude,
                latitude: item.latitude,
              })
            }
          >
            <DogPost title={item.title} content={item.content} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      ></FlatList>
    </View>
  );
};

export default FindMyDogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
  },
});

const DATA = [
  {
    id: '1',
    title: 'Dalmatyńczyk o imieniu Damian',
    content: 'Zgubił się podczas ostatniego spaceru',
    imgSrc: {uri: 'https://i.kinja-img.com/gawker-media/image/upload/c_scale,f_auto,fl_progressive,pg_1,q_80,w_800/etw5ahwcfttkqikxbfg3.jpg'},
    latitude: 54.539, 
    longitude: 18.473 
  },
  {
    id: '2',
    title: 'Bardzo duży pies',
    content: 'NIGDZIE SIE NIE ZGUBIŁ',
  },
  {
    id: '3',
    title: 'Światowy Dzień Komara',
    content:
      'W przeprowadzanych przez Lasy Państwowe badaniach opinii publicznej niechęć do kłujących nas owadów deklaruje aż co trzeci badany.',
  },
  {
    id: '4',
    title: 'Rzeźbią „Ducha lasu”',
    content:
      'W poniedziałek, mimo deszczowej pogody, rozpoczął się plener artystyczny pod hasłem „Duch lasu”, współorganizowany przez Nadleśnictwo Dukla i Gminny Ośrodek Kultury w Iwoniczu Zdroju.',
  },
  {
    id: '5',
    title: 'Światowy Dzień Komara',
    content:
      'W przeprowadzanych przez Lasy Państwowe badaniach opinii publicznej niechęć do kłujących nas owadów deklaruje aż co trzeci badany.',
  },
  {
    id: '6',
    title: 'Rzeźbią „Ducha lasu”',
    content:
      'W poniedziałek, mimo deszczowej pogody, rozpoczął się plener artystyczny pod hasłem „Duch lasu”, współorganizowany przez Nadleśnictwo Dukla i Gminny Ośrodek Kultury w Iwoniczu Zdroju.',
  },
];
