import React, { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TabScreenNavigationProp } from 'navigation/types';
import {
  View,
  FlatList,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import FieldInput from 'ui/FieldInput';
import { useAppSelector } from 'Redux/hooks';

interface ISelectedShop {
  id: number;
  city: string;
  address: string;
  latitude: string;
  longitude: string;
  hours: string;
}

const ShopsList: FC = () => {
  const navigation = useNavigation<TabScreenNavigationProp>();
  const [searchText, setSearchText] = useState<string>('');
  const locations = useAppSelector<ISelectedShop[]>(
    (state) => state.locationsUserSlice.data
  );

  const filteredLocations = locations.filter((shop) =>
    shop.address.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleShopSelected = (selectedShop: ISelectedShop) => {
    navigation.navigate('Shops', { selectedShop1: selectedShop } as any);
  };

  return (
    <View>
      <FieldInput
        placeholder="Поиск магазина"
        value={searchText}
        onChange={setSearchText}
      />
      <FlatList
        data={filteredLocations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={() => handleShopSelected(item)}>
            <View>
              <Text>
                <Text style={styles.boldText}>{item.city},</Text> {item.address}
                , {item.hours}
              </Text>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold',
  },
});

export default ShopsList;
