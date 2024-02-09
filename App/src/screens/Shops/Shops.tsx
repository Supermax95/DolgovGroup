//* https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
//* документация по карте
import React, { FC, useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
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

const Shops: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const [showMap, setShowMap] = useState(true);
  const route = useRoute();
  const selectedShop = route.params?.selectedShop as ISelectedShop | null;

  const handleShowList = () => {
    setShowMap(false);
    navigation.setParams({ selectedShop: null });
    console.log('======>', selectedShop);
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
      {showMap ? <MarketMap selectedShop={selectedShop} /> : <ShopsList />}
    </SafeAreaView>
  );
};

export default Shops;
