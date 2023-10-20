import React, { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TabScreenNavigationProp } from 'navigation/types';
import { View, FlatList, Text, TouchableHighlight } from 'react-native';
import locations from './locations';
import Field from 'ui/Field';

const ShopsList: FC = () => {
  const navigation = useNavigation<TabScreenNavigationProp>();
  const [searchText, setSearchText] = useState<string>('');

  const filteredLocations = locations.filter((shop) =>
    shop.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleShopSelected = (selectedShop1) => {
    navigation.navigate('Shops', { selectedShop1 });
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
