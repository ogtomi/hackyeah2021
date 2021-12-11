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

const ADD_KEY = '@add_element_key';

// const storeData = async (key, value) => {
//   try {
//     await AsyncStorage.setItem(key, value);
//   } catch (e) {
//     // saving error
//   }
// };

// const storeData = async (key, value) => {
//   try {
//     const jsonValue = JSON.stringify(value);
//     await AsyncStorage.setItem(key, jsonValue);
//   } catch (e) {
//     // saving error
//   }
// };

// const getData = async key => {
//   try {
//     const value = await AsyncStorage.getItem(key);
//     console.log(value);
//     if (value !== null) {
//       // value previously stored
//     }
//   } catch (e) {
//     // error reading value
//   }
// };

// const getData = async key => {
//   try {
//     var jsonValue = await AsyncStorage.getItem(key);
//     if (jsonValue != null) {
//       //console.log(JSON.parse(jsonValue));
//       return JSON.parse(jsonValue);
//     }
//   } catch (e) {
//     // error reading value
//   }
// };

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

export default function AddElement(closeModal) {
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const [selectedCategory, setSelectedCategory] = useState();

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
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <TouchableOpacity
      onPress={onClickFunction}
      style={styles.container}
      activeOpacity={1.0}
    >
      <View style={styles.pickerView}>
        <Text style={styles.pickerText}> Choose from the list</Text>
        <Picker
          style={styles.picker}
          mode="dropdown"
          prompt="Pick one, just one"
          testID="basic-picker"
          accessibilityLabel="Basic Picker Accessibility Label"
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }
        >
          <Picker.Item label="Category 1" value="category_1" />
          <Picker.Item label="Category 2" value="category_2" />
          <Picker.Item label="Category 3" value="category_3" />
          <Picker.Item label="Category 4" value="category_4" />
          <Picker.Item label="Category 5" value="category_5" />
          <Picker.Item label="Category 6" value="category_6" />
        </Picker>
      </View>
      <TextInput
        style={styles.inputText}
        placeholder="Title"
        placeholderTextColor="black"
        onChangeText={text => setFormTitle(text)}
      />
      <TextInput
        style={styles.inputText}
        multiline
        placeholder="Description"
        placeholderTextColor="black"
        onChangeText={text => setFormDescription(text)}
      />
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Choose image</Text>
      </TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <TouchableOpacity
        onPress={async () => {
          var newData = {
            id: '0',
            title: formTitle,
            description: formDescription,
            category: selectedCategory,
            imageUri: image,
          };
          appendData(ADD_KEY, newData);
          Alert.alert('OK', 'New Item added!');
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
    justifyContent: 'center',
    //marginTop: 150,
  },
  picker: {
    //width: '70%',
    //textAlign: 'center',
    color: 'black',
  },
  pickerView: {
    //width: '70%',
    //width: '70%',
    color: 'black',
    //padding: 20,
    //alignItems: 'center',
    //justifyContent: 'center',
    //marginTop: 15,
  },
  pickerText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  inputText: {
    width: '70%',
    //backgroundColor: 'rgb(255, 0, 0)',
    //borderRadius: 25,
    padding: 10,
    //height: 50,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
    color: 'black',
    borderWidth: 1,
  },
  button: {
    width: '70%',
    backgroundColor: 'rgb(255, 0, 0)',
    borderRadius: 25,
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
