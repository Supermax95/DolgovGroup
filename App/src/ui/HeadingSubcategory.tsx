import { View, Text, Pressable } from 'react-native';
import React, { FC } from 'react';
import Padding from 'ui/Padding';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface IHeadingSubcategory {
  onPress?: () => void;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  isLast?: boolean;
}

const HeadingSubcategory: FC<IHeadingSubcategory> = ({
  onPress,
  title,
  icon,
  isLast = false,
}) => {
  // const tailwindClass = isLast ? '' : 'border-b-[1px] border-zinc-200';

  return (
    <Padding>
      {/*
       <View className="w-7">
          <MaterialCommunityIcons name="chevron-right" size={19} color="gray" />
        </View>
      <View className="px-2">
        <Text>Все товары и категории</Text>
      </View> */}
      <Pressable
        onPress={onPress}
        // className={`py-4 flex-row justify-between ${tailwindClass}`}
        className={`py-3 flex-row justify-between border-b-[1px] border-zinc-200`}
      >
        <View className="px-2">
          <Text className='text-gray-800 font-medium text-md'>{title}</Text>
        </View>
        <View className="w-7">
          <MaterialCommunityIcons name="chevron-right" size={19} color="gray" />
        </View>
      </Pressable>
    </Padding>
  );
};

export default HeadingSubcategory;
