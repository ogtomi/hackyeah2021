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
            onPress={() => navigation.navigate('LostDogInfoScreen', {
                title: item.title,
                content: item.content,
            })}
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
    title: 'Bocianie spotkanie',
    content:
      'Spacerując leśną ścieżką, można powoli zaobserwować zbliżającą się jesień. Jednakże nie każdy wie, że sierpień to również miesiąc, gdy dochodzi to niezwykłych spotkań na szczycie. Zebrań, których tematem przewodnim jest „omówienie” wyprawy na kontynent odległy od Polski o tysiące kilometrów.',
  },
  {
    id: '2',
    title: 'Pustułki w powietrzu',
    content:
      'Wcześniej pustułki przebywały w prowadzonym przez Nadleśnictwo Olsztyn Ośrodku Rehabilitacji Ptaków Drapieżnych.',
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
];
