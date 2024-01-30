import { View, Text, Pressable } from 'react-native';
import React, { FC } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface IUniversalHeader {
  onPress: () => void;
  title: string;
  onPressSearch: () => void;
}

const UniversalHeader: FC<IUniversalHeader> = ({
  onPress,
  title,
  onPressSearch,
}) => {
  return (
    <View className="flex-row items-center justify-between py-2 w-full">
      <Pressable onPress={onPress}>
        <View className="w-7">
          <MaterialCommunityIcons
            name="chevron-left"
            size={36}
            color="#71716F"
          />
        </View>
      </Pressable>
      <View className="px-5 flex flex-row justify-start">
        <Text className="text-lg font-bold text-slate-800">{title}</Text>
      </View>
      <Pressable onPress={onPressSearch}>
        <View className="w-10">
          <MaterialCommunityIcons name="magnify" size={27} color="#71716F" />
        </View>
      </Pressable>
    </View>
  );
};

export default UniversalHeader;
