import { View, TextInput, Pressable, Platform } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import React, { FC } from 'react';

interface SearchAndFilterProps {
  placeholder?: string | undefined;
  value?: string | undefined;
  onChangeText?: (val: string) => void | undefined;
  onPressFilter?: () => void | undefined;
}

const SearchAndFilter: FC<SearchAndFilterProps> = ({
  placeholder,
  value,
  onChangeText,
  onPressFilter,
}) => {
  return (
    <>
      {onChangeText && onPressFilter ? (
        <View className="bg-white py-2 px-4 flex-row items-center justify-between w-full rounded-lg">
          <View className="flex-row items-center mr-10">
            <View
              className={`px-4 bg-zinc-100  rounded-xl flex-row items-center justify-center mr-2
              ${Platform.OS === 'android' ? 'py-0' : 'py-2'}`}
            >
              <MaterialCommunityIcons
                name="magnify"
                size={23}
                color="#7f7f7f"
              />
              <TextInput
                className="text-md font-normal flex-1 px-2 py-1"
                placeholderTextColor="#555"
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
              />
            </View>
          </View>

          {/* Иконка фильтра */}
          <Pressable
            onPress={onPressFilter}
            className={`right-10 rounded-xl flex items-center justify-center bg-gray-100
            ${Platform.OS === 'android' ? 'w-9 h-9' : 'w-10 h-10'}`}
          >
            <MaterialCommunityIcons name="filter" size={24} color="#7f7f7f" />
          </Pressable>
        </View>
      ) : !onChangeText && onPressFilter ? (
        <View className="py-2 flex-row items-center justify-between px-4 w-full">
          <Pressable
            onPress={onPressFilter}
            className={`rounded-xl flex items-center justify-center bg-gray-100
            ${Platform.OS === 'android' ? 'w-9 h-9' : 'w-10 h-10'}`}
          >
            <MaterialCommunityIcons name="filter" size={24} color="#7f7f7f" />
          </Pressable>
        </View>
      ) : (
        <View className="py-2 items-center justify-between w-full">
          <View className="px-4 bg-zinc-100 w-[90%] h-8  rounded-lg flex-row items-center justify-center">
            <MaterialCommunityIcons name="magnify" size={23} color="#7f7f7f" />
            <TextInput
              className="text-md font-normal flex-1 px-2 py-1"
              placeholderTextColor="#555"
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default SearchAndFilter;
