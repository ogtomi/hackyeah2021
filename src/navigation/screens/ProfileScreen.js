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

const isUserLogged = (email, password) => {
  const loginData = getData();
  if (email === loginData.email && password === loginData.password) return true;
  return false;
};

const ProfileScreen = ({ navigation }) => {
  // useEffect(() => {
  //   if (isUserLogged()) {
  //     console.log(true)
  //   }
  // })
  return (
    <View style={styles.container}>
      <View>
        <MyModal text="Register" name="Register me" />
        <MyModal text="Login" name="Log me" />
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
