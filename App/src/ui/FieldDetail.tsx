import { View, Text, Pressable } from 'react-native';
import React, { FC } from 'react';
import Padding from 'ui/Padding';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface IFieldDetail {
  onPress: () => void;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  isLast?: boolean;
}

const FieldDetail: FC<IFieldDetail> = ({
  onPress,
  title,
  icon,
  isLast = false,
}) => {
  const tailwindClass = isLast ? '' : 'border-b-[1px] border-zinc-200';
  return (
    <Padding>
      <Pressable onPress={onPress} className={`py-4 flex-row ${tailwindClass}`}>
        <View className="mr-2 w-7">
          <MaterialCommunityIcons name={icon} size={19} color="gray" />
        </View>
        <View>
          <Text>{title}</Text>
        </View>
      </Pressable>
    </Padding>
  );
};

export default FieldDetail;