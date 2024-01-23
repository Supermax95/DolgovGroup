import { View, Text, Pressable } from 'react-native';
import React, { FC } from 'react';
import Padding from 'ui/Padding';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface IHeadingSubcategory {
  onPress?: () => void;
  // icon: keyof typeof MaterialCommunityIcons.glyphMap;
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
      <Pressable
        onPress={onPress}
        // className={`py-4 flex-row justify-between ${tailwindClass}`}
        className={`px-2 py-3 flex-row border-b-[1px] border-gray-100`}
      >
        <View className="w-7">
          <MaterialCommunityIcons name="creation" size={19} color="#10b981" />
        </View>
        <View className="flex-1 flex-row justify-between">
          <View>
            <Text className="text-green-600 font-medium text-md">
              Все товары категории
            </Text>
          </View>
          <View className="w-7">
            <MaterialCommunityIcons
              name="chevron-right"
              size={26}
              color="#10b981"
            />
          </View>
        </View>
      </Pressable>

      <Pressable
        onPress={onPress}
        // className={`py-4 flex-row justify-between ${tailwindClass}`}
        className={`px-2 py-3 flex-row justify-between border-b-[1px] border-gray-100`}
      >
        <View>
          <Text className="text-green-600 font-medium text-md">
            Все товары категории
          </Text>
        </View>
        <View className="w-7">
          <MaterialCommunityIcons
            name="chevron-right"
            size={26}
            color="#10b981"
          />
        </View>
      </Pressable>

      <Pressable
        onPress={onPress}
        // className={`py-4 flex-row justify-between ${tailwindClass}`}
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

export default HeadingSubcategory;
