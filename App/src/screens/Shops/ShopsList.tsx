import React, { useState } from 'react';
import { View, FlatList, Text, TouchableHighlight } from 'react-native';
import locations from './locations';
import Field from 'ui/Field';
import { useNavigation } from '@react-navigation/native';

const ShopsList = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const filteredLocations = locations.filter(shop =>
    shop.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleShopSelected = (selectedShop1) => {
    navigation.navigate('Shops', { selectedShop1 });
  }

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
