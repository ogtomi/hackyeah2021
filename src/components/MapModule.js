import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
} from 'react-native';
import MapView, {
  Callout,
  Circle,
  LatLng,
  Marker,
  Overlay,
  Polygon,
} from 'react-native-maps';

const MapModule = ({ longitude, latitude }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [center, setCenter] = useState(null);

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
        height: Dimensions.get('window').height,
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
        onPress={e => {
          {
            console.log(location);
          }
        }}
      >
        <Circle
          //coordinates={place.Circle}
          center={{ latitude: latitude, longitude: longitude }}
          radius={5000}
          onPress={e => {
            Alert.alert(place.placeName, place.description, [{ text: 'OK' }]);
          }}
          fillColor='rgba(0, 10, 100, 0.5)'
          strokeColor="transparent"
        />
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          draggable={false}
        >
          <Callout>
            <Text>Last seen here</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

export default MapModule;
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
