import React, { useEffect } from 'react';
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

const isUserLoggedIn = async () => {
  var data = await getData(ADD_KEY)
  if (data.email !== null) return data
  return false
}

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <MyModal text="Register" name="Register me" />
        <MyModal text="Login" name="Log me" />
      </View>
      <View>
        <Text>Profile screen </Text>
      </View>
      
      <TouchableOpacity
        onPress={async () => {
          var data = await getData(ADD_KEY);
          console.log(data);
          // for (var elem of data) {
          //   console.log(elem);
          // }
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
    //justifyContent: 'center',
    marginTop: 30,
  },
  someText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});
