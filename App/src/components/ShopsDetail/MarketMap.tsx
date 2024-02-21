import React, { FC, useEffect, useRef, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from 'navigation/types';
import {
  View,
  StyleSheet,
  Platform,
  Linking,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import getUserLocations from 'Redux/thunks/Shops/locationsUser.api';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import CustomMarkerView from './CustomMarkerView';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
  onMarkerPress?: (shop: ISelectedShop) => void;
}

const MarketMap: FC<MarketMapProps> = ({ selectedShop, onMarkerPress }) => {
  // const navigation = useNavigation<StackNavigationProp>();
  const dispatch = useAppDispatch();
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const mapRef = useRef<MapView | null>(null);

  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );
  useEffect(() => {
    dispatch(getUserLocations({ token }));
    setIsLoadingPage(false);
  }, [dispatch]);

  const locations = useAppSelector<ISelectedShop[]>(
    (state) => state.locationsUserSlice.data
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
        const startTimestamp = Date.now();
        let userLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low,
        });
        const endTimestamp = Date.now();
        const elapsedTime = endTimestamp - startTimestamp;
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

  const handleDirections = () => {
    if (selectedShop) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedShop.latitude},${selectedShop.longitude}`;
      Linking.openURL(url);
    }
  };

  return (
    <>
      {isLoadingPage ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="green" />
        </View>
      ) : (
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
                onPress={() => onMarkerPress?.(shop)}
              >
                <CustomMarkerView>
                  <MaterialCommunityIcons
                    name="store-marker-outline"
                    size={35}
                    color="#047857"
                  />
                </CustomMarkerView>
              </Marker>
            ))}
            {selectedShop && (
              <Marker
                coordinate={{
                  latitude: parseFloat(selectedShop.latitude),
                  longitude: parseFloat(selectedShop.longitude),
                }}
                title={selectedShop.city}
                description={`${selectedShop.address}, ${selectedShop.hours}`}
              >
                <CustomMarkerView>
                  <MaterialCommunityIcons
                    name="store-marker-outline"
                    size={35}
                    color="#047857"
                  />
                </CustomMarkerView>
              </Marker>
            )}
          </MapView>
          {Platform.OS === 'ios' && selectedShop ? (
            // <View className="w-[50%] flex-1 absolute bottom-[-20px] right-20">
            //   <Button title="Построить маршрут" onPress={handleDirections} />
            // </View>
            <View
              className="w-[10%] flex-1 absolute bottom-[-20px] right-20"
              style={{
                shadowColor: '#000',
                shadowRadius: 4,
                shadowOpacity: 0.2,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
              }}
            >
              <Pressable
                onPress={handleDirections}
                className="text-gray-800 rounded-sm h-10 w-10 p-2 bg-blue-500 
             "
              >
                <View className="bg-blue-500 items-center justify-center">
                  <MaterialCommunityIcons
                    name="map-marker-path"
                    size={25}
                    color="white"
                  />
                </View>
              </Pressable>
            </View>
          ) : null}
        </View>
      )}
    </>
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
