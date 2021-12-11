import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { TOYS_ADD_KEY, FOOD_ADD_KEY, CLOTHES_ADD_KEY } from '../utils';
import PutPinOnaMapModule from './PutPinOnaMapModule';
import { set } from 'react-native-reanimated';

const MISSING_DOG_KEY = '@missing_dog_key';

const appendData = async (key, value) => {
  try {
    var prevData = await AsyncStorage.getItem(key);
    if (prevData != null) {
      prevData = JSON.parse(prevData);

      var lastId = prevData.length - 1;
      value.id = lastId + 1;
      prevData.push(value);
      const jsonValue = JSON.stringify(prevData);
      await AsyncStorage.setItem(key, jsonValue);
    } else {
      const jsonValue = JSON.stringify([value]);
      await AsyncStorage.setItem(key, jsonValue);
    }
  } catch (e) {
    // error reading value
  }
};

export default function AddMissingDog(closeModal) {
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formContactNumber, setFormContactNumber] = useState(null);
  const [ location, setLocation ] = useState(null)
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const onClickFunction = () => {
    Keyboard.dismiss();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [18, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const callbackLocation = (location) => {
    setLocation(location)
  }
  return (
    <TouchableOpacity
      onPress={onClickFunction}
      style={styles.container}
      activeOpacity={1.0}
    >
      <Text style={styles.titleText}> Add missing dog</Text>
      <TouchableOpacity onPress={pickImage} style={styles.chooseImage}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: '100%', height: 135 }}
          />
        )}
        {!image && (
          <Text style={styles.chooseImageText}>+ Choose image of your dog</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.labelText}>Title</Text>
      <TextInput
        style={styles.inputText}
        placeholder="Name of the dog, breed"
        placeholderTextColor="black"
        onChangeText={text => setFormTitle(text)}
      />
      <Text style={styles.labelText}>Description</Text>
      <TextInput
        style={styles.inputText}
        multiline
        placeholder="Describe your dog and what happened!"
        placeholderTextColor="black"
        minHeight={200}
        onChangeText={text => setFormDescription(text)}
      />
      <Text style={styles.labelText}>Contact number</Text>
      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        placeholder=""
        placeholderTextColor="black"
        onChangeText={text => setFormContactNumber(text)}
      />
      <Text style={styles.labelText}>Where did u see the dog?</Text>
      <PutPinOnaMapModule callbackLocation={callbackLocation}/>
      <TouchableOpacity
        onPress={async () => {
          var newData = {
            id: '0',
            title: formTitle,
            description: formDescription,
            imageUri: image,
            latitude: location.latitude,
            phoneNumber: formContactNumber,
            longitude: location.longitude
          };
          appendData(MISSING_DOG_KEY, newData);
          Alert.alert('OK', 'Success!');
          closeModal.closeModal();
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    alignItems: 'center',
    //justifyContent: 'center',
    //marginTop: 150,
  },
  labelText: { color: 'black', textAlign: 'left', fontSize: 20 },
  titleText: {
    fontSize: 30,
    color: 'black',
    marginBottom: 10,
    marginTop: 10,
    //textAlign: 'center',
  },
  chooseImage: {
    width: '90%',
    backgroundColor: '#ebebeb',
    borderRadius: 5,
    //borderWidth: 1,
    height: 135,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  mapModule: {
    height: '5%',
    justifyContent: 'flex-end',
    bottom: 0,
    position: 'absolute',
  },
  chooseImageText: { color: 'black' },
  picker: {
    //width: '75%',
    //textAlign: 'center',
    color: 'black',
  },
  pickerView: {
    width: '90%',
    padding: 10,
    backgroundColor: '#ebebeb',
    //width: '75%',
    //width: '75%',
    color: 'black',
    //padding: 20,
    //alignItems: 'center',
    //justifyContent: 'center',
    //marginTop: 15,
    marginBottom: 20,
    marginTop: 20,
  },
  pickerText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  inputText: {
    width: '90%',
    //backgroundColor: 'rgb(255, 0, 0)',
    //borderRadius: 25,
    padding: 10,
    //height: 50,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: 'black',
    backgroundColor: '#ebebeb',
    borderRadius: 5,
  },
  button: {
    width: '90%',
    backgroundColor: '#c79200',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
});
