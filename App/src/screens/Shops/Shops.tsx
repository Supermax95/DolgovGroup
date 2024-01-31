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

const Shops: FC = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const [showMap, setShowMap] = useState(true);

  return (
    <SafeAreaView className="flex-1">
      <UniversalHeader title="Магазины" />

      <View className="justify-center items-center py-2">
        <View className="flex-row items-center justify-center w-[90%] h-8 bg-slate-200 rounded-lg">
          <Pressable
            className={`rounded-lg w-[50%] h-[96%] justify-center items-center ${
              showMap ? 'bg-slate-200' : 'bg-emerald-600'
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
              showMap ? 'bg-emerald-600' : 'bg-slate-200'
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
      {showMap ? <MarketMap /> : <ShopsList />}
    </SafeAreaView>
  );
};

export default Shops;
