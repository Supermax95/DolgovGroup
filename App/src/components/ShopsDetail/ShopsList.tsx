import React, { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TabScreenNavigationProp } from 'navigation/types';
import {
  View,
  FlatList,
  Text,
  Pressable,
  Platform,
  RefreshControl,
  Alert,
} from 'react-native';
import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Padding from 'ui/Padding';
import SearchAndFilter from 'ui/SearchAndFilter';
import getUserLocations from 'Redux/thunks/Shops/locationsUser.api';

export interface ISelectedShop {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
  invisible?: boolean;
}

const ShopsList: FC = () => {
  const [selectedShop, setSelectedShop] = useState<ISelectedShop | null>(null);
  const navigation = useNavigation<TabScreenNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useAppDispatch();
  const handleShopSelected = (selectedShop: ISelectedShop) => {
    setSelectedShop(selectedShop);
    navigation.navigate('Shops', { selectedShop });
  };
  const token = useAppSelector<string | undefined>(
    (state) => state.userSlice.token?.refreshToken
  );

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await dispatch(getUserLocations({ token }));
    } catch (error) {
      Alert.alert('Ошибка при обновлении данных');
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, 500);
    }
  };
  useEffect(() => {
    onRefresh();
  }, []);
  
  const locations = useAppSelector<ISelectedShop[]>(
    (state) => state.locationsUserSlice.data
  );

  const filteredLocations = locations.filter(
    (location) => location.invisible === false
  );

  const filterLocations = () => {
    let filtered = filteredLocations;

    if (searchText !== '') {
      filtered = filtered.filter((location) => {
        const locationFields = [
          String(location.city),
          String(location.address),
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
      <SearchAndFilter
        placeholder="Найти магазин"
        value={searchText}
        onChangeText={setSearchText}
      />

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
                <View className="flex-col space-y-1 w-[90%]">
                  <View className="flex-col space-y-1">
                    <Text className="text-zinc-700 font-normal text-base">
                      {item.city}
                    </Text>
                    <Text className="text-zinc-700 font-normal text-md">
                      {item.address}
                    </Text>
                  </View>
                  <Text className="text-zinc-500 font-normal text-md">
                    {item.hours}
                  </Text>

                  {/* </View> */}
                </View>
              </Pressable>
            </Padding>
          </Padding>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View className="flex-row justify-center items-center mt-4">
            <Text className="text-lg font-normal text-zinc-500">
              Информация отсутствует
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
