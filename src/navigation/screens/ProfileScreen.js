import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MyModal from '../../components/MyModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoggedProfile from '../../components/LoggedProfile';
import NotloggedProfile from '../../components/NotloggedProfile';

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
  const [DATA, setDATA] = useState('');
  const [refreshing, setRefreshing] = useState(true);

  useEffect(async () => {
    var loadedData = await getData(ADD_KEY);
    setDATA(loadedData);
    setRefreshing(false);
    console.log(loadedData);
  }, []);

  const onRefresh = async () => {
    var loadedData = await getData(ADD_KEY);
    setDATA(loadedData);
    setRefreshing(false);
    console.log(loadedData);
  };

  return (
    <View style={styles.container}>
      {/* <View>
        <MyModal text="Register" name="Register me" />
        <MyModal text="Login" name="Log me" />
      </View> */}
      <View>
        <Text>
          {DATA !== undefined ? (
            <LoggedProfile name={DATA.name} surname={DATA.surname} email={DATA.email}/>
          ) : (
            <NotloggedProfile />
          )}
        </Text>
      </View>
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
