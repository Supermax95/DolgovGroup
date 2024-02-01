import { View, Text, Pressable } from 'react-native';
import React, { FC } from 'react';
import Padding from 'ui/Padding';

interface IFieldEditProfile {
  onPress?: () => void;
  title: string;
  children?: React.ReactNode;
}

const FieldEditProfile: FC<IFieldEditProfile> = ({
  onPress,
  title,
  children,
}) => {
  return (
    <Padding>
      <Pressable
        onPress={onPress}
        className="py-4 flex-row items-center border-b-[1px] border-zinc-200 justify-between"
      >
        <View>
          <Text className="text-zinc-800 font-normal text-md">{title}</Text>
        </View>
        <View>
          <Text className="text-zinc-500 font-normal text-md">{children}</Text>
        </View>
      </Pressable>
    </Padding>
  );
};

export default FieldEditProfile;
