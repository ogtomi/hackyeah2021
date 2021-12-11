import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MyModal from './MyModal';

const NotloggedProfile = () => {
  return (
    <View>
      <View style={styles.welcomeView}>
        <Text style={styles.welcomeText}>
          Login or register to fully discover the app potential
        </Text>
      </View>
      <MyModal text="Login" name="Log me" />
      <MyModal text="Register" name="Register me" />
    </View>
  );
};

export default NotloggedProfile;

const styles = StyleSheet.create({

  welcomeText: {
    marginTop: 75,
    marginBottom: 75,
    fontSize: 32,    
  },
  welcomeView: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
