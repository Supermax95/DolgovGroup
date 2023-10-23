// import React, { FC, useEffect, useRef, useState } from 'react';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from 'navigation/types';
// import { View, StyleSheet, Button as RNButton } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import Button from 'ui/Button';
// import locations from './locations';
// import * as Location from 'expo-location';

// const Shops: FC = () => {
//   const navigation = useNavigation<StackNavigationProp>();
//   const mapRef = useRef(null);
//   const route = useRoute();
//   const selectedShop = route.params?.selectedShop1;
//   const [userLocation, setUserLocation] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status === 'granted') {
//         let userLocation = await Location.getCurrentPositionAsync({});
//         setUserLocation(userLocation.coords);
//         if (selectedShop && mapRef.current) {
//           mapRef.current.animateToRegion({
//             latitude: selectedShop.latitude,
//             longitude: selectedShop.longitude,
//             latitudeDelta: 0.005,
//             longitudeDelta: 0.005,
//           });
//         }
//       }
//     })();
//   }, [selectedShop]);

//   const showMyLocation = () => {
//     if (userLocation && mapRef.current) {
//       mapRef.current.animateToRegion({
//         latitude: userLocation.latitude,
//         longitude: userLocation.longitude,
//         latitudeDelta: 0.005,
//         longitudeDelta: 0.005,
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button
//         title="Список магазинов"
//         onPress={() => navigation.navigate('ShopsList')}
//       />
//       <RNButton title="Показать моё местоположение" onPress={showMyLocation} />
//       <MapView
//         ref={mapRef}
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         initialRegion={{
//           latitude: selectedShop
//             ? selectedShop.latitude
//             : userLocation
//             ? userLocation.latitude
//             : 54.725607,
//           longitude: selectedShop
//             ? selectedShop.longitude
//             : userLocation
//             ? userLocation.longitude
//             : 20.5382,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         {locations.map((shop, index) => (
//           <Marker
//             key={index}
//             coordinate={{
//               latitude: shop.latitude,
//               longitude: shop.longitude,
//             }}
//             title={shop.name}
//             pinColor={selectedShop === shop ? 'blue' : 'green'}
//           >
//             {/* <Callout onPress={() => setSelectedShop(shop)} /> */}
//           </Marker>
//         ))}
//         {userLocation && (
//           <Marker
//             coordinate={{
//               latitude: userLocation.latitude,
//               longitude: userLocation.longitude,
//             }}
//             title="Ваше местоположение"
//             pinColor="red"
//           />
//         )}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
// });

// export default Shops;



import React, { FC, useEffect, useRef, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import { View, StyleSheet, Button as RNButton } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region, LatLng } from 'react-native-maps';
import Button from 'ui/Button';
import locations from './locations';
import * as Location from 'expo-location';

interface ISelectedShop {
  latitude?: number;
  longitude?: number;
  name?: string;
}

const Shops: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const mapRef = useRef<MapView | null>(null);
  const route = useRoute();
  const selectedShop = route.params?.selectedShop1 as ISelectedShop | undefined;
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let userLocation = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });
        if (selectedShop && mapRef.current) {
          const region: Region = {
            latitude: selectedShop.latitude || userLocation.coords.latitude || 54.725607,
            longitude: selectedShop.longitude || userLocation.coords.longitude || 20.5382,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          };
          mapRef.current.animateToRegion(region);
        }
      }
    })();
  }, [selectedShop]);

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
          latitude: selectedShop?.latitude || userLocation?.latitude || 54.725607,
          longitude: selectedShop?.longitude || userLocation?.longitude || 20.5382,
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
          />
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
