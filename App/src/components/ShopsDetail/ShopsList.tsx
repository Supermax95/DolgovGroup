import React, { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TabScreenNavigationProp } from 'navigation/types';
import {
  View,
  FlatList,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import FieldInput from 'ui/FieldInput';
import { useAppSelector } from 'Redux/hooks';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Padding from 'ui/Padding';

interface ISelectedShop {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
}

// interface ShopsListProps {
//   onShopSelected: (selectedShop: ISelectedShop) => void;
// }

const ShopsList: FC = () => {
  const [selectedShop, setSelectedShop] = useState<ISelectedShop | null>(null);
  const navigation = useNavigation<TabScreenNavigationProp>();
  const handleShopSelected = (selectedShop: ISelectedShop) => {
    setSelectedShop(selectedShop);
    navigation.navigate('MarketMap', { selectedShop });
  };
  const [searchText, setSearchText] = useState<string>('');
  const locations = useAppSelector<ISelectedShop[]>(
    (state) => state.locationsUserSlice.data
  );

  const filteredLocations = locations.filter((shop) =>
    shop.address.toLowerCase().includes(searchText.toLowerCase())
  );

  // const handleShopSelected = (selectedShop: ISelectedShop) => {
  //   navigation.navigate('Shops', { selectedShop1: selectedShop } as any);
  // };
  // const tailwindClass = isLast ? '' : 'border-b-[1px] border-zinc-200';

  return (
    <View className="">
      {/* Search */}
      <View className="py-2 items-center justify-between w-full">
        <View className="px-4 bg-gray-100 w-[90%] h-8  rounded-lg flex-row items-center justify-center">
          <MaterialCommunityIcons name="magnify" size={23} color="#7f7f7f" />
          <TextInput
            className="text-md font-normal flex-1 px-2 py-1"
            placeholderTextColor="#555"
            placeholder="Найти магазин"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* List Market */}
      <FlatList
        data={filteredLocations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Padding>
            <Padding>
              <Pressable
                onPress={() => handleShopSelected(item)}
                className="py-4 flex-row border-b-[1px] border-zinc-200"
              >
                <View className="w-9 mt-1">
                  <MaterialCommunityIcons
                    name="store-marker-outline"
                    size={26}
                    color="#047857"
                  />
                </View>
                <View className="flex-col">
                  <View>
                    <Text className="text-base font-normal text-gray-700">
                      {item.city}
                    </Text>
                    <Text className="text-md font-normal text-gray-700">
                      {item.address}
                    </Text>
                  </View>
                  <View className="flex-row justify-center items-center">
                    {/* <View className="w-5">
                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={15}
                        color="gray"
                      />
                    </View> */}
                    <Text className="text-md font-normal text-gray-500">
                      {item.hours}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </Padding>
          </Padding>
        )}
      />
    </View>
  );
};

export default ShopsList;
