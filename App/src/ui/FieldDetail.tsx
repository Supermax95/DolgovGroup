import { View, Text, Pressable } from 'react-native';
import React, { FC } from 'react';
import Padding from 'ui/Padding';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface IFieldDetail {
  onPress: () => void;
  icon: keyof typeof FontAwesome.glyphMap;
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
        <View className="mr-2 w-5">
          <FontAwesome name={icon} size={18} color="gray" />
        </View>
        <View>
          <Text>{title}</Text>
        </View>
      </Pressable>
    </Padding>
  );
};

export default FieldDetail;
