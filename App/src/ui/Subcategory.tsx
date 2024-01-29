import { View, Text, Pressable } from 'react-native';
import React, { FC } from 'react';
import Padding from 'ui/Padding';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface ISubcategory {
  onPress?: () => void;
  title: string;
}

const Subcategory: FC<ISubcategory> = ({ onPress, title }) => {
  return (
    <Padding>
      <Pressable
        onPress={onPress}
        className={`px-2 py-3 flex-row justify-between border-b-[1px] border-gray-100`}
      >
        <View>
          <Text className="text-gray-800 font-medium text-md">{title}</Text>
        </View>
        <View className="w-7">
          <MaterialCommunityIcons
            name="chevron-right"
            size={26}
            color="#b7b7b6"
          />
        </View>
      </Pressable>
    </Padding>
  );
};

export default Subcategory;
