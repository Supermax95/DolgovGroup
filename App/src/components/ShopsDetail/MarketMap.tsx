import React, { FC, useEffect, useRef, useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from 'navigation/types';
import {
  View,
  StyleSheet,
  Platform,
  Linking,
  TouchableOpacity,
  Text,
} from 'react-native';
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

interface MarketMapProps {
  selectedShop?: ISelectedShop | null;
}

const MarketMap: FC<MarketMapProps> = ({ selectedShop }) => {
  // const navigation = useNavigation<StackNavigationProp>();
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
    console.log('я в юзееффекте');

    const fetchInitialLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        console.log('я прошел дальше');
        const startTimestamp = Date.now();
        let userLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low,
        });
        const endTimestamp = Date.now();
        const elapsedTime = endTimestamp - startTimestamp;
        console.log('userLocation', userLocation);
        console.log(
          'Время выполнения getCurrentPositionAsync():',
          elapsedTime,
          'мс'
        );
        if (userLocation && mapRef.current) {
          if (selectedShop) {
            console.log('у меня есть selectedShop');
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
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        // toolbarEnabled={true}
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
      {Platform.OS === 'ios' && selectedShop ? (
        <View className="w-[50%] flex-1 absolute bottom-[-20px] right-20">
          <Button title="Построить маршрут" onPress={handleDirections} />
        </View>
      ) : null}

      {/* <TouchableOpacity style={styles.button} onPress={handleDirections}>
        <Text style={styles.buttonText}>Построить маршрут</Text>
      </TouchableOpacity> */}
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   map: {
//     flex: 1,
//   },
//   button: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     backgroundColor: '#007bff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

export default MarketMap;

// import React, { FC } from 'react';
// import {
//   View,
//   StyleSheet,
//   Platform,
//   TouchableOpacity,
//   Text,
//   Linking,
// } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import Button from 'ui/Button';

// interface ISelectedShop {
//   id: number;
//   city: string;
//   address: string;
//   latitude: string;
//   longitude: string;
//   hours: string;
// }

// interface MarketMapProps {
//   selectedShop?: ISelectedShop | null;
// }

// const MarketMap: FC<MarketMapProps> = ({ selectedShop }) => {
//   const initialRegion = {
//     latitude: 54.725607,
//     longitude: 20.5382,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   };

//   const locations: ISelectedShop[] = []; // Замените на ваш массив магазинов
//   const mapRef = React.useRef<MapView>(null);

//   const handleDirections = () => {
//     if (selectedShop) {
//       const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedShop.latitude},${selectedShop.longitude}`;
//       Linking.openURL(url);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         ref={mapRef}
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         initialRegion={initialRegion}
//         showsUserLocation={true}
//         followsUserLocation={true}
//         rotateEnabled={true}
//         mapType={'standard'}
//         showsCompass={true}
//         showsScale={true}
//         showsIndoors={true}
//         zoomEnabled={true}
//         loadingEnabled={true}
//       >
//         {locations.map((shop, index) => (
//           <Marker
//             key={index}
//             coordinate={{
//               latitude: parseFloat(shop.latitude) || 0,
//               longitude: parseFloat(shop.longitude) || 0,
//             }}
//             title={shop.city}
//             description={`${shop.address}, ${shop.hours}`}
//             pinColor="green"
//           />
//         ))}
//         {selectedShop && (
//           <Marker
//             coordinate={{
//               latitude: parseFloat(selectedShop.latitude),
//               longitude: parseFloat(selectedShop.longitude),
//             }}
//             title={selectedShop.city}
//             description={`${selectedShop.address}, ${selectedShop.hours}`}
//             pinColor="green"
//           />
//         )}
//       </MapView>
//       {Platform.OS === 'ios' && selectedShop ? (
//         // <TouchableOpacity style={styles.button} onPress={handleDirections}>
//         //   <Text style={styles.buttonText}>Построить маршрут</Text>
//         // </TouchableOpacity>
//         <Button title="Построить маршрут" onPress={handleDirections} />
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   map: {
//     flex: 1,
//   },
//   button: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     backgroundColor: '#007bff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default MarketMap;
