import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

const PutPinOnaMapModule = ({ callbackLocation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getLastKnownPositionAsync();
      let coords = {
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.5,
      }}
    >
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 54.539,
          longitude: 18.473,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        provider="google"
      >
        <Marker
          coordinate={{ latitude: 54.539, longitude: 18.473 }}
          draggable={true}
          onDragEnd={e => {
            callbackLocation(e.nativeEvent.coordinate);
          }}
        >
          <Callout>
            <Text>Last seen here</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

export default PutPinOnaMapModule;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    marginVertical: 50,
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',
  },
  buttonView: {
    marginBottom: 10,
    width: '100%',

    //marginLeft: 5,
    marginRight: 15,
    height: 60,
    backgroundColor: 'rgb(0, 80, 35)',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
  },
  buttonViewText: {
    fontSize: 45,
    alignSelf: 'center',
  },
});

const colors = {
  work: 'rgba(0, 10, 100, 0.5)',
};

var DATA = [
  {
    id: '1',
    placeName: 'Pożar',
    color: colors.work,
    polygon: [{ latitude: 54.539, longitude: 18.473 }],
    description: 'W tym regionie występuje pożar. Nie zbliżaj się do lasu.',
  },
];
