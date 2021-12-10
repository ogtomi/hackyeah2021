import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  Alert,
} from 'react-native';

const MyModal = props => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed');
          setModalVisible(!modalVisible);
        }}
      >
        <View styles={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.text}</Text>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable style={[styles.button, styles.buttonOpen]}>
        <Text>{props.name}</Text>
      </Pressable>
    </View>
  );
};

export default MyModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    alignSelf: 'stretch',
    width: 380,
    //height: 100,
    height: Dimensions.get('window').height / 6 - 20,
    padding: 10,
    elevation: 2,
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonOpen: {
    backgroundColor: 'rgb(0, 80, 35)',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'left',
  },
});
