import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LoggedProfile = ({ name, surname, email }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => AsyncStorage.clear()}
        style={styles.logOut}
      >
        <Text style={styles.logOutText}>Log out</Text>
      </TouchableOpacity>
      <View style={styles.loginData}>
        <View style={styles.namesView}>
          <Text style={styles.textNames}>{name}</Text>
          <Text style={styles.textNames}>{surname}</Text>
        </View>
        <View style={styles.namesView}>
          {/* <Text style={styles.emailText}>email:</Text> */}
          <Text style={styles.emailText}>{email}</Text>
        </View>
      </View>
    </View>
  );
};

export default LoggedProfile;

const styles = StyleSheet.create({
  logOut: {
    padding: 10,
    elevation: 2,
    width: 375,
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
  namesView: {
    flexDirection: 'row',
    marginTop: 20
  },
  loginData: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNames: {
      fontSize: 32
  },
  emailText: {
      fontSize: 20
  }
});
