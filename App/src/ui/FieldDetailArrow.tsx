import { View, Text, Pressable } from 'react-native';
import React, { FC } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Padding from './Padding';

interface IFieldDetailArrow {
  onPress?: () => void;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
}

const FieldDetailArrow: FC<IFieldDetailArrow> = ({ onPress, icon, title }) => {
  return (
    <Padding>
      <Pressable
        onPress={onPress}
        className="py-3 flex-row items-center justify-between border-b-[1px] border-zinc-200"
      >
        <View className="flex-row items-center justify-center space-x-3">
          <MaterialCommunityIcons name={icon} size={19} color="#71716F" />
          <Text className="text-zinc-700 font-normal text-md">{title}</Text>
        </View>

        <MaterialCommunityIcons
          name="chevron-right"
          size={26}
          color="#b7b7b6"
        />
      </Pressable>
    </Padding>
  );
};

export default FieldDetailArrow;
