//* https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
//* документация по карте
import React, { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import { View, Pressable, Text } from 'react-native';

import UniversalHeader from 'ui/UniversalHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShopsList from '../../components/ShopsDetail/ShopsList';
import MarketMap from '../../components/ShopsDetail/MarketMap';

interface ISelectedShop {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
}

// interface IRouteParams {
//   selectedShop?: ISelectedShop | null;
// }

// const Shops: FC = ({ route }: any) => {
//   const navigation = useNavigation<StackNavigationProp>();
//   const [showMap, setShowMap] = useState(true);
//   const  selectedShop  = route.params;

  const Shops: FC = ({ route }: any) => {
    const navigation = useNavigation<StackNavigationProp>();
    const [showMap, setShowMap] = useState(true);
    const selectedShop = route.params?.selectedShop as ISelectedShop | null;
    
    // const  selectedShop  = route.params as IRouteParams;
  
  const handleShowList = () => {
    setShowMap(false);
    navigation.setParams({ selectedShop: null });
  };

  const handleMarkerPress = (shop: ISelectedShop) => {
    navigation.setParams({ selectedShop: shop });
  };

  const handleShowMap = () => {
    setShowMap(true);
  };

  useEffect(() => {
    if (selectedShop) {
      setShowMap(true);
    }
  }, [selectedShop]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <UniversalHeader title="Магазины" />

      <View className="justify-center items-center py-2">
        <View className="flex-row items-center justify-center w-[90%] h-8 bg-gray-100 rounded-lg">
          <Pressable
            className={`rounded-lg w-[50%] h-[96%] justify-center items-center ${
              showMap ? 'bg-gray-100' : 'bg-emerald-700'
            }`}
            onPress={handleShowList}
          >
            <Text
              className={`text-md font-medium ${
                showMap ? 'text-zinc-700' : 'text-white'
              }`}
            >
              Список
            </Text>
          </Pressable>
          <Pressable
            className={`rounded-lg w-[50%] h-[96%] justify-center items-center ${
              showMap ? 'bg-emerald-700' : 'bg-gray-100'
            }`}
            onPress={handleShowMap}
          >
            <Text
              className={`text-md font-medium ${
                showMap ? 'text-white' : 'text-zinc-700'
              }`}
            >
              На карте
            </Text>
          </Pressable>
        </View>
      </View>
      {showMap ? (
        <MarketMap
          onMarkerPress={handleMarkerPress}
          selectedShop={selectedShop}
        />
      ) : (
        <ShopsList />
      )}
    </SafeAreaView>
  );
};

export default Shops;
