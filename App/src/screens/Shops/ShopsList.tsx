import React, { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TabScreenNavigationProp } from 'navigation/types';
import { View, FlatList, Text, TouchableHighlight } from 'react-native';
import locations from './locations';
import Field from 'ui/Field';

interface ISelectedShop {
  latitude?: number;
  longitude?: number;
  name?: string;
}

const ShopsList: FC = () => {
  const navigation = useNavigation<TabScreenNavigationProp>();
  const [searchText, setSearchText] = useState<string>('');

  const filteredLocations = locations.filter((shop) =>
    shop.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleShopSelected = (selectedShop: ISelectedShop) => {
    navigation.navigate('Shops', { selectedShop1: selectedShop } as any);
  };
  
  

  return (
    <View>
      <Field
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
              <Text>{item.name}</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
};

export default ShopsList;
