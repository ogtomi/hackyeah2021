import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MyModal from './MyModal';

const NotloggedProfile = () => {
  return (
    <View>
      <MyModal text="Login" name="Log me" />
      <MyModal text="Register" name="Register me" />
    </View>
  );
};

export default NotloggedProfile;

const styles = StyleSheet.create({
  logOut: {
    padding: 10,
    elevation: 2,
    width: '100%',
    height: 40,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOutText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
