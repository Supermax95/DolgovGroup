//* https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
//* документация по карте

import React, { FC, useEffect, useRef, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'navigation/types';
import { View, Pressable, Text } from 'react-native';

import UniversalHeader from 'ui/UniversalHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShopsList from './ShopsList';
import MarketMap from './MarketMap';


interface ISelectedShop {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
}

const Shops: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const [showMap, setShowMap] = useState(true);
  const [selectedShop, setSelectedShop] = useState<ISelectedShop | null>(null);

  const handleShopSelected = (shop: ISelectedShop) => {
    setSelectedShop(shop);
  };
  console.log('======>',selectedShop);
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <UniversalHeader title="Магазины" />

      <View className="justify-center items-center py-2">
        <View className="flex-row items-center justify-center w-[90%] h-8 bg-gray-100 rounded-lg">
          <Pressable
            className={`rounded-lg w-[50%] h-[96%] justify-center items-center ${
              showMap ? 'bg-gray-100' : 'bg-emerald-700'
            }`}
            onPress={() => setShowMap(false)}
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
            onPress={() => setShowMap(true)}
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
      {showMap ? <MarketMap selectedShop={selectedShop} />  : <ShopsList onShopSelected={handleShopSelected} />}
    </SafeAreaView>
  );
};

export default Shops;
