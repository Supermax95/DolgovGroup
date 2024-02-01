import React, { FC, useEffect, useRef, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import { View, StyleSheet, Button as RNButton, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import getUserLocations from 'Redux/thunks/Shops/locationsUser.api';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import Button from 'ui/Button';

interface ISelectedShop {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
}

// interface MarketMapProps {
//   selectedShop: ISelectedShop | null;
// }

const MarketMap: FC = () => {
  
  const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  
  const mapRef = useRef<MapView | null>(null);
  const route = useRoute();
  const selectedShop = route.params?.selectedShop as ISelectedShop | null;
  console.log('MarketMap======>',selectedShop);

  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);
  const locations = useAppSelector<ISelectedShop[]>(
    (state) => state.locationsUserSlice.data
  );

  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );

  useEffect(() => {
    dispatch(getUserLocations({ token }));
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let userLocation = await Location.getCurrentPositionAsync({});
        if (userLocation) {
          setUserLocation(userLocation);
          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
          }
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedShop && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: parseFloat(selectedShop.latitude),
        longitude: parseFloat(selectedShop.longitude),
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [selectedShop]);

  // const showMyLocation = () => {
  //   if (userLocation && mapRef.current) {
  //     mapRef.current.animateToRegion({
  //       latitude: userLocation.coords.latitude,
  //       longitude: userLocation.coords.longitude,
  //       latitudeDelta: 0.005,
  //       longitudeDelta: 0.005,
  //     });
  //   }
  // };

  //? Сейчас навешан форс для того чтобы актуализировать данные от админа
  // const showMyLocation = () => {
  //   if (userLocation && mapRef.current) {
  //     mapRef.current.animateToRegion(
  //       {
  //         latitude: userLocation.coords.latitude,
  //         longitude: userLocation.coords.longitude,
  //         latitudeDelta: 0.005,
  //         longitudeDelta: 0.005,
  //       },
  //       1000
  //     );

  //     setTimeout(() => {
  //       dispatch(getUserLocations({ force: true }));
  //     }, 1000);
  //   }
  // };

  const initialRegion = selectedShop
    ? {
        latitude: parseFloat(selectedShop.latitude),
        longitude: parseFloat(selectedShop.longitude),
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }
    : userLocation
    ? {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }
    : {
        latitude: 54.725607,
        longitude: 20.5382,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

  return (
    <View className="bg-white flex-1">
      {/* <Button title="Показать моё местоположение" onPress={showMyLocation} /> */}
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
            pinColor={
              selectedShop &&
              selectedShop.latitude === shop.latitude &&
              selectedShop.longitude === shop.longitude
                ? 'blue'
                : 'green'
            }
          />
        ))}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
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
  map: {
    flex: 1,
    marginBottom: Platform.OS === 'android' ? 0 : -35,
  },
});

export default MarketMap;
