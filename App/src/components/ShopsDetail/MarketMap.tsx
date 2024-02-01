import React, { FC, useEffect, useRef, useState } from 'react';
import {  useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import { View, StyleSheet, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import getUserLocations from 'Redux/thunks/Shops/locationsUser.api';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';

interface ISelectedShop {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
}

interface MarketMapProps {
  selectedShop?: ISelectedShop | null;
}

const MarketMap: FC<MarketMapProps> = ({ selectedShop }) => {
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    dispatch(getUserLocations({ token }));
  }, [dispatch]);

  const locations = useAppSelector<ISelectedShop[]>(
    (state) => state.locationsUserSlice.data
  );

  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );

  const [initialRegion, setInitialRegion] = useState({
    latitude: 54.725607,
    longitude: 20.5382,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });


  useEffect(() => {
    const fetchInitialLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let userLocation = await Location.getCurrentPositionAsync({});
        if (userLocation && mapRef.current) {
          if (selectedShop) {
            mapRef.current.animateToRegion({
              latitude: parseFloat(selectedShop.latitude),
              longitude: parseFloat(selectedShop.longitude),
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
            setInitialRegion({
              latitude: parseFloat(selectedShop.latitude),
              longitude: parseFloat(selectedShop.longitude),
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
          } else {
            mapRef.current.animateToRegion({
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
            setInitialRegion({
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
          }
        }
      }
    };
  
    fetchInitialLocation();
  }, [selectedShop]);
  

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        toolbarEnabled={true}
        rotateEnabled={true}
        mapType={'standard'}
        showsCompass={true}
        showsScale={true}
        showsIndoors={true}
        zoomEnabled={true}
        loadingEnabled={true}
      >
        {locations.map((shop, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(shop.latitude) || 0,
              longitude: parseFloat(shop.longitude) || 0,
            }}
            title={shop.city}
            description={`${shop.address}, ${shop.hours}`}
            pinColor="green"
            
          />
        ))}
        {selectedShop && (
          <Marker
            coordinate={{
              latitude: parseFloat(selectedShop.latitude),
              longitude: parseFloat(selectedShop.longitude),
            }}
            title={selectedShop.city}
            description={`${selectedShop.address}, ${selectedShop.hours}`}
            pinColor="green"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
    marginBottom: Platform.OS === 'android' ? 0 : -35,
  },
});

export default MarketMap;

