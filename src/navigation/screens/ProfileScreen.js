import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MyModal from '../../components/MyModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ADD_KEY = '@register_key';

const getData = async key => {
  try {
    var jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue != null) {
      //console.log(JSON.parse(jsonValue));
      return JSON.parse(jsonValue);
    }
  } catch (e) {
    console.log(e);
    // error reading value
  }
};

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MyModal text="Login" name="Log me" />
      <MyModal text="Register" name="Register me" />
      <TouchableOpacity
        onPress={async () => {
          var data = await getData(ADD_KEY);
          console.log(data);
          for (var elem of data) {
            console.log(elem);
          }
        }}
      >
        <Text>READ VALUE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  someText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});
