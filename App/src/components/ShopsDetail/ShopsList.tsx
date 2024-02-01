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
  Platform,
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
  invisible: boolean;
}

// interface ShopsListProps {
//   onShopSelected: (selectedShop: ISelectedShop) => void;
// }

const ShopsList: FC = () => {
  const [selectedShop, setSelectedShop] = useState<ISelectedShop | null>(null);
  const navigation = useNavigation<TabScreenNavigationProp>();

  const [searchText, setSearchText] = useState<string>('');

  const handleShopSelected = (selectedShop: ISelectedShop) => {
    setSelectedShop(selectedShop);
    navigation.navigate('MarketMap', { selectedShop });
  };
  const locations = useAppSelector<ISelectedShop[]>(
    (state) => state.locationsUserSlice.data
  );

  const filteredLocations = locations.filter(
    (location) => location.invisible === false
  );

  console.log('filteredLocations========================>', filteredLocations);

  const filterLocations = () => {
    let filtered = filteredLocations;

    if (searchText !== '') {
      filtered = filtered.filter((location) => {
        const locationFields = [
          String(location.city),
          String(location.address),
          String(location.latitude),
          String(location.longitude),
          String(location.hours),
        ];

        const searchTerms = searchText.toLowerCase().split(' ');

        return searchTerms.every((term) =>
          locationFields.some((field) => field.toLowerCase().includes(term))
        );
      });
    }

    return filtered;
  };

  const filteredLocationsSearch = filterLocations();

  return (
    <View style={{ height: '95%' }}>
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

      {/* //! Попробовать через скролл сделать подрузку, прокинуть элемент загрузки. Через сиды сделать 300 штук локаций */}
      {/* List Market */}
      <FlatList
        data={filteredLocationsSearch}
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
                    {/* <View className="w-5 items-center justify-center">
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
        ListEmptyComponent={
          <View className="flex-row justify-center items-center mt-4">
            <Text className="text-lg font-normal text-gray-500">
              Ничего не найдено
            </Text>
          </View>
        }
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'android' ? 70 : 35,
        }}
      />
    </View>
  );
};

export default ShopsList;
