import React, { useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet, Button as RNButton, Text } from 'react-native'; 
import Button from 'ui/Button'; 
import locations from './locations';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const Shops = () => {
  const mapRef = useRef(null);
  const route = useRoute();
  const selectedShop = route.params?.selectedShop1;
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let userLocation = await Location.getCurrentPositionAsync({});
        setUserLocation(userLocation.coords);
        if (selectedShop && mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: selectedShop.latitude,
            longitude: selectedShop.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }
      }
    })();
  }, [selectedShop]);

  const navigation = useNavigation();

  const showMyLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Список магазинов"
        onPress={() => navigation.navigate('ShopsList')}
      />
      <RNButton title="Показать моё местоположение" onPress={showMyLocation} />
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: selectedShop ? selectedShop.latitude : userLocation ? userLocation.latitude : 54.725607,
          longitude: selectedShop ? selectedShop.longitude : userLocation ? userLocation.longitude : 20.5382,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {locations.map((shop, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: shop.latitude,
              longitude: shop.longitude,
            }}

            title={shop.name}
            pinColor={selectedShop === shop ? 'blue' : 'green'}
          >
           
            {/* <Callout onPress={() => setSelectedShop(shop)} /> */}
          </Marker>
        ))}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Ваше местоположение"
            pinColor="red"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Shops;
