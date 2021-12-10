import React from 'react';
import MyModal from '../../components/MyModal';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


const LostDogInfoScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("FindMyDogScreen")}>
            <Text style={styles.someText}>
                aoshdfuasd
            </Text>
        </TouchableOpacity>
      <Text>Lost dog info screen</Text>
    </View>
  );
};

export default LostDogInfoScreen;

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
