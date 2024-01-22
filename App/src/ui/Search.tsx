import { View, Pressable, TextInput } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Search = () => {
  return (
    <View
      className={`bg-purple-100 py-4 flex-row items-center justify-between px-4 w-full`}
    >
      <View className={`flex-row items-center mr-12`}>
        <View
          className={`px-4 py-2 bg-gray-100  rounded-xl flex-row items-center justify-center mr-2`}
        >
          <MaterialCommunityIcons name="magnify" size={23} color="#7f7f7f" />
          <TextInput
            className={`text-md font-normal flex-1 px-2 py-1`}
            placeholderTextColor="#555"
            placeholder="Найти продукты"
            // value={searchTerm}
            // onChangeText={handleSearchTerm}
          />
        </View>
      </View>

      <Pressable
        className={`w-12 h-12 right-11 rounded-xl flex items-center justify-center bg-gray-100`}
      >
        <MaterialCommunityIcons name="filter" size={24} color="#7f7f7f" />
      </Pressable>
    </View>
  );
};

export default Search;
